const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Cv = require('../models/Cv');

const router = express.Router();

// upload dizini environment veya default
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage: dosyayı filesysteme kaydet
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // benzersiz isim (zaman damgası + orijinal isim)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit; ihtiyaca göre arttır
  fileFilter: function (req, file, cb) {
    // sadece pdf ve doc/dotx/odt izin ver, ihtiyaca göre genişlet
    const allowed = /pdf|doc|docx|odt/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece PDF/DOC/DOCX/ODT dosya tiplerine izin verilmektedir.'));
    }
  }
});

// POST /api/cv
router.post('/', upload.single('cvFile'), async (req, res) => {
  try {
    // alan doğrulamaları
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      // dosyayı sil (gerekiyorsa)
      if (req.file && req.file.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'CV dosyası yüklenmelidir.' });
    }

    // yeni cv kaydı
    const newCv = new Cv({
      firstName,
      lastName,
      email,
      phone,
      fileOriginalName: req.file.originalname,
      fileStorageName: req.file.filename,
      fileMimeType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path
    });

    await newCv.save();

    return res.json({ success: true, id: newCv._id });
  } catch (err) {
    console.error('cv upload error', err);
    return res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;