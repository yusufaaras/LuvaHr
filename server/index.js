// server.js - Express routerlar MongoDB ile çalışacak şekilde güncellendi (robust + proxy-aware + graceful shutdown)
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const dbPromise = require('./db');

const app = express();

// Eğer nginx/Cloudflare vb. arkasındaysanız bu gerekli (X-Forwarded-* doğru çalışsın)
app.set('trust proxy', true);

// Body parser - json limit ihtiyaca göre ayarlayın
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Include upload router (multer) - içinde DB kontrolü var
const cvUpload = require('./routes/cv-upload');
app.use(cvUpload);

// Basit sağlık kontrolü
app.get('/ping', (req, res) => res.send('pong'));

// Helper: DB yoksa 503 döndür
function ensureDb(res, db) {
  if (!db) {
    res.status(503).json({ ok: false, message: 'Database not available. Try again later.' });
    return false;
  }
  return true;
}

// GET /api/cvs - tüm kayıtları çek
app.get('/api/cvs', async (req, res) => {
  try {
    const db = await dbPromise;
    if (!ensureDb(res, db)) return;
    const coll = db.collection('cvs');
    const rows = await coll.find({}).sort({ created_at: -1 }).toArray();

    const mapped = rows.map(r => ({
      id: r._id.toString(),
      name: r.name || '',
      email: r.email || '',
      phone: r.phone || '',
      filename: r.filename || '',
      filepath: r.filepath || '',
      section_title: r.section_title || '',
      expertise: r.expertise || '',
      created_at: (r.created_at ? r.created_at.toISOString() : '')
    }));

    return res.json({ ok: true, data: mapped });
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
    if (!ensureDb(res, db)) return;
    const coll = db.collection('cvs');

    let oid;
    try {
      oid = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ ok: false, message: 'Geçersiz id' });
    }

    const updateDoc = {
      $set: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        expertise: expertise || section_title || ''
      }
    };

    const result = await coll.updateOne({ _id: oid }, updateDoc);
    return res.json({ ok: true, affectedRows: result.matchedCount || 0 });
  } catch (err) {
    console.error('DB update hatası:', err);
    return res.status(500).json({ ok: false, message: 'Güncelleme hatası.' });
  }
});

// Kayıt silme - dosyayı da uploads dizininden sil
app.delete('/api/cvs/:id', requireAdmin, async (req, res) => {
  const id = req.params.id;
  const uploadsDir = path.resolve(path.join(__dirname, '../uploads'));

  try {
    const db = await dbPromise;
    if (!ensureDb(res, db)) return;
    const coll = db.collection('cvs');

    let oid;
    try {
      oid = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ ok: false, message: 'Geçersiz id' });
    }

    const doc = await coll.findOne({ _id: oid });
    if (!doc) {
      return res.status(404).json({ ok: false, message: 'Kayıt bulunamadı' });
    }

    let candidatePath = '';
    if (doc.filepath) {
      candidatePath = path.resolve(path.join(__dirname, '..', doc.filepath));
    } else if (doc.filename) {
      candidatePath = path.resolve(path.join(uploadsDir, doc.filename));
    }

    let fileDeleted = false;
    if (candidatePath) {
      const normalizedUploads = uploadsDir + path.sep;
      if (!candidatePath.startsWith(normalizedUploads) && candidatePath !== uploadsDir) {
        console.warn('Dosya yolu uploads dizini dışında:', candidatePath);
      } else {
        try {
          await fs.unlink(candidatePath);
          fileDeleted = true;
        } catch (unlinkErr) {
          console.warn('Dosya silinirken hata (varsa yoksa göz ardı edilecek):', unlinkErr.message);
        }
      }
    }

    const result = await coll.deleteOne({ _id: oid });
    return res.json({
      ok: true,
      deleted: result.deletedCount || 0,
      fileDeleted
    });
  } catch (err) {
    console.error('DB silme hatası:', err);
    return res.status(500).json({ ok: false, message: 'Silme hatası.' });
  }
});

// DOWNLOAD route
app.get('/download/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const uploadsDir = path.resolve(path.join(__dirname, '../uploads'));

    const db = await dbPromise;
    if (!ensureDb(res, db)) return;
    const coll = db.collection('cvs');

    let oid;
    try {
      oid = new ObjectId(id);
    } catch (err) {
      return res.status(400).send('Geçersiz id');
    }

    const doc = await coll.findOne({ _id: oid });
    if (!doc) {
      return res.status(404).send('Kayıt/dosya bulunamadı');
    }

    let filePath = '';
    let suggestedName = '';
    if (doc.filepath) {
      filePath = path.resolve(path.join(__dirname, '..', doc.filepath));
      suggestedName = path.basename(doc.filepath);
    } else if (doc.filename) {
      filePath = path.resolve(path.join(uploadsDir, doc.filename));
      suggestedName = doc.filename;
    } else {
      return res.status(404).send('Dosya bilgisi yok');
    }

    const normalizedUploads = uploadsDir + path.sep;
    if (!filePath.startsWith(normalizedUploads) && filePath !== uploadsDir) {
      console.warn('İzin dışı dosya isteği:', filePath);
      return res.status(400).send('İzin verilmeyen dosya yolu');
    }

    if (!fsSync.existsSync(filePath)) {
      return res.status(404).send('Dosya bulunamadı');
    }

    return res.download(filePath, suggestedName, (err) => {
      if (err) {
        console.error('Download error', err);
        if (err.code === 'ENOENT') return res.status(404).send('Dosya bulunamadı');
        return res.status(500).send('Dosya indirme hatası');
      }
    });
  } catch (err) {
    console.error('Download route error', err);
    return res.status(500).send('Sunucu hatası');
  }
});

// Statik dosyaları sun - React build dosyalarını serve et
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fsSync.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

// 404 handler: API için JSON, diğerleri için index.html (SPA fallback)
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/forms') || req.path.startsWith('/download')) {
    return res.status(404).json({ ok: false, message: 'Not Found' });
  }
  // SPA fallback: React index.html sun
  const indexPath = path.join(clientBuildPath, 'index.html');
  if (fsSync.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ ok: false, message: 'Internal server error' });
});

// Server start + graceful shutdown
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Graceful shutdown: close DB client if present
async function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  try {
    const db = await dbPromise;
    if (db && db.s && db.s.client) {
      try {
        await db.s.client.close();
        console.log('MongoDB client closed.');
      } catch (e) {
        console.warn('Error closing MongoDB client:', e.message || e);
      }
    }
  } catch (e) {
    // ignore
  }
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => {
    console.error('Forcing shutdown.');
    process.exit(1);
  }, 10000);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));