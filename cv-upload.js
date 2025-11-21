// cv-upload.js - dosya upload + MongoDB insert (güncellendi)
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dbPromise = require('./db'); // artık MongoDB Db instance döndürüyor

const uploadDir = path.join(__dirname, 'uploads', 'cvs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit
const router = express.Router();

router.post('/forms/cv-send', upload.single('cvFile'), async (req, res) => {
  try {
    const db = await dbPromise;
    const coll = db.collection('cvs');

    const { name, email, phone, section_title, expertise } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ ok: false, message: 'CV dosyası yok.' });

    const filename = file.filename;
    const filepath = path.join('uploads', 'cvs', filename).replace(/\\/g, '/');

    const section = (section_title && section_title.toString().trim()) ? section_title.toString().trim() : 'Uzmanlıklarımız';

    const doc = {
      name: name || '',
      email: email || '',
      phone: phone || '',
      filename,
      filepath,
      section_title: section,
      expertise: expertise || '',
      created_at: new Date()
    };

    const result = await coll.insertOne(doc);

    console.log('CV kaydedildi (MongoDB):', { id: result.insertedId.toString(), ...doc });
    return res.json({ ok: true, message: 'CV gönderilmiştir.', id: result.insertedId.toString() });
  } catch (err) {
    console.error('CV upload veya DB hatası:', err);
    return res.status(500).json({ ok: false, message: 'Sunucu/veritabanı hatası.' });
  }
});

module.exports = router;