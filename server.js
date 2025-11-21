const express = require('express');
const path = require('path');
require('dotenv').config(); // varsa .env kullanımı

// DB promise (db.js bir Promise olarak pool döndürüyor)
const dbPromise = require('./db');

const app = express();

// Middleware: body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaları sun (index.html proje kökündeyse)
app.use('/', express.static(path.join(__dirname)));

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

// Kayıt silme
app.delete('/api/cvs/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const db = await dbPromise;
    const [result] = await db.execute('DELETE FROM cvs WHERE id = ?', [id]);
    return res.json({ ok: true, deleted: result.affectedRows || result.affected_rows || 0 });
  } catch (err) {
    console.error('DB silme hatası:', err);
    return res.status(500).json({ ok: false, message: 'Silme hatası.' });
  }
});

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