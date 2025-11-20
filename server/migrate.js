require('dotenv').config();
const mongoose = require('mongoose');
const Applicant = require('./models/Applicant');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luvahr';
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  // create collection (MongoDB otomatik oluşturur), ama index isterseniz:
  await Applicant.init(); // schema indekslerini uygular
  console.log('Migration completed');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});