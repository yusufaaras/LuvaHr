const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dbPromise = require('./db'); // db.js bir promise olarak pool döndürüyor

const uploadDir = path.join(__dirname, 'uploads', 'cvs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // örn 10MB limit
const router = express.Router();

router.post('/forms/cv-send', upload.single('cvFile'), async (req, res) => {
  try {
    const db = await dbPromise; // pool
    const { name, email, phone } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ ok: false, message: 'CV dosyası yok.' });

    const filename = file.filename;
    // Kaydedilecek path (frontend/backend ortamına göre istenirse tam URL de saklanabilir)
    const filepath = path.join('uploads', 'cvs', filename).replace(/\\/g, '/');

    const sql = `INSERT INTO cvs (name, email, phone, filename, filepath) VALUES (?, ?, ?, ?, ?)`;
    const params = [name || '', email || '', phone || '', filename, filepath];

    const [result] = await db.execute(sql, params);

    console.log('CV kaydedildi (MySQL):', { id: result.insertId, name, email, phone, filename, filepath });
    return res.json({ ok: true, message: 'CV başarıyla yüklendi ve veritabanına kaydedildi.', id: result.insertId });
  } catch (err) {
    console.error('CV upload veya DB hatası:', err);
    return res.status(500).json({ ok: false, message: 'Sunucu/veritabanı hatası.' });
  }
});

module.exports = router;