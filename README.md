# LuvaHr - İnsan Kaynakları ve Yönetim Danışmanlığı

Modern Vite + React frontend ve Node.js/Express backend ile geliştirilmiş İK yönetim platformu.

## 🏗️ Proje Yapısı

```
LuvaHr/
├── client/              # React frontend (Vite)
│   ├── public/         # Statik dosyalar (assets, images)
│   ├── src/
│   │   ├── components/ # React bileşenleri
│   │   ├── pages/      # Sayfa bileşenleri
│   │   ├── utils/      # Yardımcı fonksiyonlar
│   │   ├── App.jsx     # Ana uygulama
│   │   └── main.jsx    # Giriş noktası
│   └── package.json
├── server/             # Express backend
│   ├── routes/        # API route'ları
│   ├── middleware/    # Express middleware
│   ├── db.js          # MongoDB bağlantısı
│   ├── index.js       # Express app
│   ├── .env           # Ortam değişkenleri
│   ├── .env.example   # Örnek ortam değişkenleri
│   └── package.json
├── uploads/           # Yüklenen dosyalar
└── package.json       # Root package (monorepo scripts)
```

## 📋 Gereksinimler

- Node.js >= 16.x
- npm >= 8.x
- MongoDB Atlas hesabı veya yerel MongoDB kurulumu

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle

```bash
# Root, client ve server bağımlılıklarını yükle
npm run install:all

# Ya da her birini ayrı ayrı:
npm install              # Root dependencies
cd client && npm install # Client dependencies
cd server && npm install # Server dependencies
```

### 2. Ortam Değişkenlerini Yapılandır

`server/.env.example` dosyasını `server/.env` olarak kopyalayın ve gerekli değerleri girin:

```bash
cd server
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Server Port
PORT=8000

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
MONGO_DB_NAME=luvahr

# Admin Authentication Token
ADMIN_TOKEN=your-secure-admin-token-here
```

**Önemli:** 
- `MONGO_URI`: MongoDB Atlas bağlantı string'inizi girin
- `ADMIN_TOKEN`: Güçlü bir token belirleyin (admin işlemleri için kullanılacak)

## 🔧 Geliştirme Modu

### Hem Client hem Server'ı Aynı Anda Çalıştır

```bash
npm run dev
```

Bu komut:
- Client'ı `http://localhost:5173` adresinde başlatır (Vite dev server)
- Server'ı `http://localhost:8000` adresinde başlatır (nodemon ile)
- Client'tan gelen API istekleri otomatik olarak server'a proxy edilir

### Ayrı Ayrı Çalıştırma

Client için:
```bash
cd client
npm run dev
```

Server için:
```bash
cd server
npm run dev
```

## 🏭 Production Build

### 1. Client'ı Build Et

```bash
npm run build
```

Bu komut `client/dist` klasörüne production build oluşturur.

### 2. Production Server'ı Başlat

```bash
npm start
```

Server, `client/dist` klasöründeki build'i otomatik olarak serve eder.

Production'da server: `http://localhost:8000`

## 📡 API Endpoints

### CV Yönetimi

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| GET | `/api/cvs` | Tüm CV kayıtlarını listele | Hayır |
| POST | `/forms/cv-send` | Yeni CV gönder | Hayır |
| PUT | `/api/cvs/:id` | CV kaydını güncelle | Evet |
| DELETE | `/api/cvs/:id` | CV kaydını sil | Evet |
| GET | `/download/:id` | CV dosyasını indir | Hayır |

### Diğer

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/ping` | Sağlık kontrolü |

### Authentication

Admin işlemleri (PUT, DELETE) için `x-admin-token` header'ı veya `admin_token` query parametresi gereklidir:

```javascript
// Header ile
axios.delete('/api/cvs/123', {
  headers: { 'x-admin-token': 'your-token' }
});

// Query parameter ile
fetch('/api/cvs/123?admin_token=your-token', { method: 'DELETE' });
```

## 🎨 Özellikler

### Frontend (React)

- ✅ Vite ile hızlı development
- ✅ React Router ile sayfa yönlendirme
- ✅ Responsive tasarım (Bootstrap 5)
- ✅ CV yükleme formu
- ✅ Admin paneli (filtreleme, düzenleme, silme)
- ✅ Excel export
- ✅ AOS animasyonlar

### Backend (Express)

- ✅ MongoDB ile veri saklama
- ✅ Multer ile dosya yükleme
- ✅ CORS desteği
- ✅ Token-based admin authentication
- ✅ Graceful shutdown
- ✅ Error handling

## 📁 Sayfa Yapısı

| Route | Bileşen | Açıklama |
|-------|---------|----------|
| `/` | Home | Ana sayfa |
| `/service/:id` | ServiceDetails | Hizmet detayları |
| `/starter` | StarterPage | Başlangıç sayfası |
| `/admin` | Admin | Admin paneli |

## 🔒 Güvenlik

- ⚠️ `.env` dosyasını **asla** git'e commit etmeyin
- ⚠️ Production'da güçlü `ADMIN_TOKEN` kullanın
- ⚠️ MongoDB bağlantı string'inde IP whitelist ayarlayın
- ⚠️ HTTPS kullanın (production)

## 📝 Notlar

### Uploads Dizini

Yüklenen CV dosyaları `uploads/cvs/` klasörüne kaydedilir. Bu klasör `.gitignore`'da olmalı ve production sunucuda manuel oluşturulmalıdır:

```bash
mkdir -p uploads/cvs
```

### MongoDB Collections

- `cvs`: CV kayıtları
  - `_id`: MongoDB ObjectId
  - `name`: Aday adı
  - `email`: E-posta
  - `phone`: Telefon
  - `filename`: Dosya adı
  - `filepath`: Dosya yolu
  - `section_title`: Uzmanlık alanı
  - `expertise`: Deneyim/notlar
  - `created_at`: Oluşturulma tarihi

## 🐛 Sorun Giderme

### Port zaten kullanımda

```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### MongoDB bağlantı hatası

- `.env` dosyasındaki `MONGO_URI` doğru mu?
- MongoDB Atlas'ta IP whitelist ayarları kontrol edin
- Network bağlantınızı kontrol edin

### Build hatası

```bash
# node_modules'ı temizle ve yeniden yükle
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install:all
```

## 📞 Destek

Herhangi bir sorun için issue açabilirsiniz.

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**Geliştirme:** Vite + React + Express + MongoDB Stack
