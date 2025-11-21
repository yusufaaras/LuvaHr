const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'luvahr',
  DB_PORT = 3306
} = process.env;

let pool;

async function init() {
  // Pool oluştur (db belirtilen ise doğrudan ona bağlanır)
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
  });

  // Tabloyu oluştur (uygulama başladığında)
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS cvs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      filename VARCHAR(512),
      filepath VARCHAR(1024),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const conn = await pool.getConnection();
  try {
    await conn.query(createTableSQL);
    console.log('MySQL bağlantısı kuruldu ve tablo "cvs" hazır.');
  } finally {
    conn.release();
  }

  return pool;
}

// Başlatma: require edildiğinde init'i çalıştır ve pool'u döndür
module.exports = (async () => {
  try {
    const p = await init();
    return p;
  } catch (err) {
    console.error('DB init hatası:', err);
    throw err;
  }
})();