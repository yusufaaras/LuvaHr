// db.js - MongoDB bağlantısı, promise olarak Db instance döner
// Kullanım: const db = await dbPromise; const coll = db.collection('cvs');

const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'luvahr';

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is required. See .env.example');
  process.exit(1);
}

let client;

async function init() {
  // Not: modern mongodb driver (v4+) için useNewUrlParser/useUnifiedTopology gibi legacy opsiyonlar
  // artık desteklenmiyor — bu yüzden opsiyonları boş bırakıyoruz.
  client = new MongoClient(MONGO_URI);

  await client.connect();
  const db = client.db(MONGO_DB_NAME);

  // Koleksiyon ve indeksleri oluştur/garanti et
  const coll = db.collection('cvs');
  try {
    // created_at için index (sorgularda sıralama için faydalı)
    await coll.createIndex({ created_at: -1 });
    // email gibi alanlara index isterseniz ekleyin: await coll.createIndex({ email: 1 });
  } catch (err) {
    console.warn('Index oluşturma sırasında uyarı:', err.message);
  }

  console.log(`MongoDB connected to ${MONGO_DB_NAME}`);
  return db;
}

// Başlatma: module.exports bir Promise döner (requiring modülün hemen DB'ye bağlanmasını sağlar)
module.exports = (async () => {
  try {
    return await init();
  } catch (err) {
    console.error('DB init hatası:', err);
    // Hata fırlatıyoruz ki çağıran kod (server) bilebilsin; isterseniz burada process.exit(1) de kullanabilirsiniz.
    throw err;
  }
})();