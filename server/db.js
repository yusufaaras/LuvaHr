// db.js - MongoDB bağlantısı (retry, hatada crash etmeyecek şekilde)
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'luvahr';

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is not set. See .env.example');
}

let client = null;
let db = null;

async function tryConnectOnce() {
  if (!MONGO_URI) return null;
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(MONGO_DB_NAME);
    const coll = db.collection('cvs');
    try { await coll.createIndex({ created_at: -1 }); } catch (e) { console.warn('Index yaratma uyarı:', e.message); }
    console.log(`MongoDB connected to ${MONGO_DB_NAME}`);
    return db;
  } catch (err) {
    console.error('MongoDB connect attempt failed:', err && err.message ? err.message : err);
    return null;
  }
}

async function initWithRetry(retries = 5, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    const connected = await tryConnectOnce();
    if (connected) return connected;
    console.warn(`MongoDB bağlanamadı. Deneme ${i+1}/${retries}. ${delayMs}ms sonra tekrar deneniyor.`);
    await new Promise(r => setTimeout(r, delayMs));
    delayMs *= 1.5;
  }
  console.error(`MongoDB'ye ${retries} denemede bağlanılamadı. Uygulama DB olmadan çalışmaya devam edecek; endpointler 503 dönecek.`);
  return null;
}

module.exports = (async () => {
  try {
    return await initWithRetry(5, 3000);
  } catch (err) {
    console.error('DB init hatası:', err);
    return null;
  }
})();