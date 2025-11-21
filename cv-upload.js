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
    const { name, email, phone, section_title, expertise } = req.body; // expertise eklendi
    const file = req.file;
    if (!file) return res.status(400).json({ ok: false, message: 'CV dosyası yok.' });

    const filename = file.filename;
    const filepath = path.join('uploads', 'cvs', filename).replace(/\\/g, '/');

    const section = (section_title && section_title.toString().trim()) ? section_title.toString().trim() : 'Uzmanlıklarımız';

    // expertise sütununu da insert'e ekliyoruz (eğer formda yoksa boş string gönder)
    const sql = `INSERT INTO cvs (name, email, phone, filename, filepath, section_title, expertise) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [name || '', email || '', phone || '', filename, filepath, section, expertise || ''];

    const [result] = await db.execute(sql, params);

    console.log('CV kaydedildi (MySQL):', { id: result.insertId, name, email, phone, filename, filepath, section, expertise });
    return res.json({ ok: true, message: 'CV gönderilmiştir.', id: result.insertId });
  } catch (err) {
    console.error('CV upload veya DB hatası:', err);
    return res.status(500).json({ ok: false, message: 'Sunucu/veritabanı hatası.' });
  }
});

module.exports = router;