const express = require('express');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config(); // varsa .env kullanımı

// DB promise (db.js bir Promise olarak pool döndürüyor)
const dbPromise = require('./db');

const app = express();

// Middleware: body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router'ı include et (mevcut upload router)
const cvUpload = require('./cv-upload');
app.use(cvUpload);

// Basit sağlık kontrolü
app.get('/ping', (req, res) => res.send('pong'));

// GET /api/cvs - tüm kayıtları çek
app.get('/api/cvs', async (req, res) => {
  try {
    const db = await dbPromise;
    // expertise sütununu ekledim:
    const [rows] = await db.query('SELECT id, name, email, phone, filename, filepath, section_title, expertise, created_at FROM cvs ORDER BY created_at DESC');
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error('DB okuma hatası:', err);
    return res.status(500).json({ ok: false, message: 'Veritabanı okuma hatası.' });
  }
});

// Basit admin doğrulama middleware (ENV: ADMIN_TOKEN)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.admin_token;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
  next();
}

// Kayıt güncelleme
app.put('/api/cvs/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, expertise, section_title } = req.body;
  try {
    const db = await dbPromise;
    // Eğer veritabanınızda expertise sütunu yoksa section_title kullanılıyor olabilir.
    // Bu sorguyu mevcut tablo yapınıza göre düzenleyin:
    const sql = `UPDATE cvs SET name = ?, email = ?, phone = ?, section_title = ? WHERE id = ?`;
    const params = [name || '', email || '', phone || '', expertise || section_title || '', id];
    const [result] = await db.execute(sql, params);
    return res.json({ ok: true, affectedRows: result.affectedRows || result.affected_rows || 0 });
  } catch (err) {
    console.error('DB update hatası:', err);
    return res.status(500).json({ ok: false, message: 'Güncelleme hatası.' });
  }
});

// Kayıt silme - dosyayı da uploads dizininden sil
app.delete('/api/cvs/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const uploadsDir = path.resolve(path.join(__dirname, 'uploads'));

  try {
    const db = await dbPromise;

    // İlk önce kaydın dosya yolunu al
    const [rows] = await db.query('SELECT filename, filepath FROM cvs WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, message: 'Kayıt bulunamadı' });
    }
    const row = rows[0];
    // Dosya yolu belirle (filepath varsa onu kullan, yoksa uploads/filename)
    let candidatePath = '';
    if (row.filepath) {
      candidatePath = path.resolve(path.join(__dirname, row.filepath));
    } else if (row.filename) {
      candidatePath = path.resolve(path.join(uploadsDir, row.filename));
    }

    // Eğer candidatePath uploads dizini içinde değilse silmeyi reddet (güvenlik)
    let fileDeleted = false;
    if (candidatePath) {
      if (!candidatePath.startsWith(uploadsDir + path.sep) && candidatePath !== uploadsDir) {
        console.warn('Dosya yolu uploads dizini dışında:', candidatePath);
      } else {
        try {
          await fs.unlink(candidatePath);
          fileDeleted = true;
        } catch (unlinkErr) {
          // Dosya yoksa veya silinemiyorsa, sadece uyar; yine de DB kaydını sil
          console.warn('Dosya silinirken hata (varsa yoksa göz ardı edilecek):', unlinkErr.message);
        }
      }
    }

    // DB kaydını sil
    const [result] = await db.execute('DELETE FROM cvs WHERE id = ?', [id]);
    return res.json({
      ok: true,
      deleted: result.affectedRows || result.affected_rows || 0,
      fileDeleted
    });
  } catch (err) {
    console.error('DB silme hatası:', err);
    return res.status(500).json({ ok: false, message: 'Silme hatası.' });
  }
});

// DOWNLOAD route: id ile çağır -> DB'den dosya yolunu çöz -> güvenli şekilde indir
app.get('/download/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const uploadsDir = path.resolve(path.join(__dirname, 'uploads'));

    const db = await dbPromise;
    const [rows] = await db.query('SELECT filename, filepath FROM cvs WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).send('Kayıt/dosya bulunamadı');
    }
    const row = rows[0];

    // Dosya yolunu belirle
    let filePath = '';
    let suggestedName = '';
    if (row.filepath) {
      filePath = path.resolve(path.join(__dirname, row.filepath));
      // Eğer filepath son segmenti varsa onu indirme adına öner
      suggestedName = path.basename(row.filepath);
    } else if (row.filename) {
      filePath = path.resolve(path.join(uploadsDir, row.filename));
      suggestedName = row.filename;
    } else {
      return res.status(404).send('Dosya bilgisi yok');
    }

    // Güvenlik kontrolü: sadece uploads dizini içinden izin ver
    if (!filePath.startsWith(uploadsDir + path.sep) && filePath !== uploadsDir) {
      console.warn('İzin dışı dosya isteği:', filePath);
      return res.status(400).send('İzin verilmeyen dosya yolu');
    }

    // res.download otomatik Content-Disposition koyar
    return res.download(filePath, suggestedName, (err) => {
      if (err) {
        console.error('Download error', err);
        // Eğer dosya yoksa 404 döndürelim
        if (err.code === 'ENOENT') return res.status(404).send('Dosya bulunamadı');
        return res.status(500).send('Dosya indirme hatası');
      }
    });
  } catch (err) {
    console.error('Download route error', err);
    return res.status(500).send('Sunucu hatası');
  }
});

// Statik dosyaları sun (index.html proje kökündeyse)
app.use('/', express.static(path.join(__dirname)));

// Başlangıçta (sunucu açılırken) tabloya expertise sütunu eklemeyi dene (MySQL)
(async () => {
  try {
    const db = await dbPromise;
    // MySQL sürümünüz IF NOT EXISTS desteklemeyebilir; önce SHOW COLUMNS ile kontrol edelim
    const [cols] = await db.query(`SHOW COLUMNS FROM cvs LIKE 'expertise'`);
    if (!cols || cols.length === 0) {
      try {
        await db.query(`ALTER TABLE cvs ADD COLUMN expertise VARCHAR(255)`);
        console.log('expertise sütunu eklendi.');
      } catch (alterErr) {
        console.warn('expertise sütunu eklenemedi:', alterErr.message);
      }
    } else {
      // sütun zaten var
      // console.log('expertise sütunu zaten var.');
    }
  } catch (err) {
    console.error('Başlangıç DB kontrol hatası:', err);
  }
})();

// Server başlat
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});