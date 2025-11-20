const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true },      // isim
  surname: { type: String, required: true },   // soyisim
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true },
  cvPath: { type: String, required: true },    // diskteki veya erişilebilir path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Applicant', ApplicantSchema);