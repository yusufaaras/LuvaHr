// server/routes/cvs.js
const express = require('express');
const router = express.Router();
const Cv = require('../models/cv');

// POST /api/cvs - yeni CV ekle
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, expertise } = req.body;
    // Basit doğrulama
    if (!firstName || !lastName || !email || !phone || !expertise) {
      return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
    }
    const cv = new Cv({ firstName, lastName, email, phone, expertise });
    await cv.save();
    res.status(201).json({ message: 'CV kaydedildi', cv });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// GET /api/cvs - tüm CV'leri getir
router.get('/', async (req, res) => {
  try {
    // İsteğe bağlı: pagination ekleyebilirsiniz (skip/limit)
    const cvs = await Cv.find().sort({ createdAt: -1 }).exec();
    res.json(cvs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;