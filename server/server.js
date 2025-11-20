// server/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// routes (varsa ayrıca oluştur)
// const cvRoute = require('./routes/cv'); // eğer ayrı route dosyan varsa require et

const app = express();
const PORT = process.env.PORT || 3000;

// Basit CORS (eğer frontend ayrı origin'den istek atacaksa)
app.use(cors());

// body parser (form-data dosya upload için multer kullanılacak, bu sadece json/urlencoded için)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik frontend dosyalarını sun (proje yapısına göre ayarla)
app.use(express.static(path.join(__dirname, '..'))); // projenin kökünü statik yapar, cv.html kökteyse erişilir

// Örnek basit CV route (eğer routes/cv.js yoksa test için)
// NOT: Gerçek upload için multer kullan ve dosyaları kaydet
app.post('/api/cv', (req, res) => {
  // Eğer form-data ile dosya gönderiyorsan multer kullanman lazım --> bu handler dosya alamaz.
  res.status(400).json({ error: 'Bu endpoint test içindir. Gerçek upload için multer route ekle.' });
});

// MongoDB bağlantı fonksiyonu: DB bağlanırsa server başlat
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luvahrcv';

// Bağlantıyı aç ve server'ı sadece DB bağlıysa başlat (daha güvenli metod)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err.message || err);
  // Eğer istersen burada process.exit(1) yerine server'ı yine başlatabilirsin,
  // ama çoğu üretim akışı DB olmadan çalışma anlamlı olmadığından exit edilir.
  // process.exit(1);

  // Alternatif: DB yoksa da statik dosyaları sun ve admin'e uyar
  app.listen(PORT, () => {
    console.warn(`Server started on ${PORT} WITHOUT DB connection. Some features will fail.`);
  });
});

// global hata dinleyiciler (opsiyonel)
mongoose.connection.on('error', err => {
  console.error('Mongoose connection error event:', err);
});