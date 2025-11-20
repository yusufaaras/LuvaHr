const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fileOriginalName: { type: String },
  fileStorageName: { type: String }, // backendte kaydettiğimiz dosya ismi/path
  fileMimeType: { type: String },
  fileSize: { type: Number },
  filePath: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cv', CvSchema);