// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const cvsRouter = require('./routes/cvs');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/luvahr';

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/cvs', cvsRouter);

// Statik frontend (repo root) - eğer sunucu aynı repo içinde tutulacaksa
app.use(express.static(path.join(__dirname, '..')));

// Basit health check
app.get('/health', (req, res) => res.json({ ok: true }));

// MongoDB bağlantısı
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});