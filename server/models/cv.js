// server/models/Cv.js
const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  phone:     { type: String, required: true, trim: true },
  expertise: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cv', CvSchema);