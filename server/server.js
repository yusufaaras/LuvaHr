require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const Applicant = require('./models/Applicant');

const app = express();
app.use(cors());
app.use(express.json());

// upload dizini yoksa oluştur
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    cb(null, `${ts}_${safeName}${ext}`);
  }
});
const upload = multer({ storage });

// MongoDB bağlantısı
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luvahr';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sağlık kontrolü
app.get('/api/health', (req, res) => res.json({ ok: true }));

// CV başvurusu endpoint'i
// Form alan isimleri: name, surname, email, phone, cv
app.post('/api/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, surname, email, phone } = req.body;
    if (!name || !surname || !email || !phone) {
      // dosya yüklense bile alanların hepsi zorunluysa kontrol
      return res.status(400).json({ error: 'Eksik alan: name, surname, email, phone zorunlu.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'CV dosyası gerekli.' });
    }

    const applicant = new Applicant({
      name,
      surname,
      email,
      phone,
      cvPath: path.relative(process.cwd(), req.file.path) // veya req.file.path
    });
    await applicant.save();

    return res.json({ ok: true, id: applicant._id });
  } catch (err) {
    console.error('Error /api/apply:', err);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// CV dosyalarını servis etmek isterseniz (üretimde dikkat!)
app.use('/uploads', express.static(UPLOAD_DIR));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));