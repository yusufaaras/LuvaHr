require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantısı
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/luvahrcv';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error', err);
});

// bodyparser (form-data kullanıldığı için multer kullanacağız, ama json route'lar için)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statik frontend dosyalarını sun (projedeki konuma göre değiştir)
app.use(express.static(path.join(__dirname, '..', 'public')));

// cv route
const cvRoute = require('./routes/cv');
app.use('/api/cv', cvRoute);

// uploads statik erişim (dilersen korumalı yap)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});