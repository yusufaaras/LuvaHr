const express = require('express');
const path = require('path');
require('dotenv').config(); // varsa .env kullanımı

// DB'yi başlat ve referans al
const db = require('./db');

const app = express();

// Middleware: body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaları sun (index.html proje kökündeyse)
app.use('/', express.static(path.join(__dirname)));

// Router'ı include et
const cvUpload = require('./cv-upload');
app.use(cvUpload);

// Basit sağlık kontrolü
app.get('/ping', (req, res) => res.send('pong'));

// Test: veritabanındaki kayıtları görmek için endpoint
app.get('/api/cvs', (req, res) => {
  db.all('SELECT id, name, email, phone, filename, created_at FROM cvs ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      console.error('DB okuma hatası:', err);
      return res.status(500).json({ ok: false, message: 'Veritabanı okuma hatası.' });
    }
    return res.json({ ok: true, data: rows });
  });
});

// Server başlat
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});