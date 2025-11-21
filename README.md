# LuvaHr - İnsan Kaynakları ve Yönetim Danışmanlığı

Modern React tabanlı İnsan Kaynakları ve Yönetim Danışmanlığı web uygulaması.

## 🚀 Teknolojiler

### Frontend
- **React 19** - Modern UI kütüphanesi
- **Vite** - Hızlı build tool ve dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - UI framework
- **AOS** - Scroll animasyonları

### Backend
- **Node.js + Express** - REST API
- **MongoDB** - Veritabanı
- **Multer** - Dosya yükleme

## 📁 Proje Yapısı

```
LuvaHr/
├── frontend/                 # React frontend uygulaması
│   ├── public/              # Statik dosyalar
│   │   └── assets/          # CSS, JS, resimler
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # Ortak bileşenler (Header, Footer, etc.)
│   │   │   └── pages/       # Sayfa bileşenleri
│   │   ├── services/        # API servisleri
│   │   └── utils/           # Yardımcı fonksiyonlar
│   ├── package.json
│   └── vite.config.js
├── server.js                # Express backend server
├── db.js                    # MongoDB bağlantısı
├── cv-upload.js             # CV yükleme route'u
└── package.json             # Backend dependencies

```

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- MongoDB Atlas hesabı (veya local MongoDB)

### 1. Repository'yi Clone'layın

```bash
git clone https://github.com/yusufaaras/LuvaHr.git
cd LuvaHr
```

### 2. Backend Kurulumu

```bash
# Root dizinde backend dependencies'i yükleyin
npm install
```

### 3. Frontend Kurulumu

```bash
# Frontend dizinine gidin
cd frontend

# Frontend dependencies'i yükleyin
npm install
```

### 4. Ortam Değişkenlerini Ayarlayın

Root dizinde `.env` dosyası oluşturun:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/luvahr?retryWrites=true&w=majority
MONGO_DB_NAME=luvahr

# Server Configuration
PORT=8000

# Admin Token (güncelleme/silme işlemleri için)
ADMIN_TOKEN=your-secure-admin-token

# CORS - Development Frontend Origin
DEV_FRONTEND_ORIGIN=http://localhost:3000
```

## 🚀 Geliştirme Modu

İki terminal açın:

### Terminal 1: Backend Server

```bash
# Root dizinde
npm start
```

Backend server `http://localhost:8000` adresinde çalışacaktır.

### Terminal 2: Frontend Dev Server

```bash
# Frontend dizininde
cd frontend
npm run dev
```

Frontend dev server `http://localhost:3000` adresinde çalışacaktır.

Vite proxy sayesinde tüm `/api`, `/forms` ve `/uploads` istekleri otomatik olarak backend'e yönlendirilir.

## 🏗️ Production Build

### Frontend Build

```bash
cd frontend
npm run build
```

Build dosyaları `frontend/dist` klasörüne oluşturulur.

### Production'da Çalıştırma

```bash
# Root dizinde
npm start
```

Server hem API endpoint'lerini hem de React uygulamasını `http://localhost:8000` adresinden serve eder.

## 📝 Özellikler

- ✅ Modern React 19 ve Vite ile hızlı geliştirme
- ✅ React Router ile SPA (Single Page Application)
- ✅ Responsive tasarım (mobil uyumlu)
- ✅ CV yükleme ve yönetim sistemi
- ✅ Admin paneli ile CV kayıtlarını görüntüleme, düzenleme ve silme
- ✅ Excel/CSV export özelliği
- ✅ MongoDB veritabanı entegrasyonu
- ✅ ESLint ve Prettier ile kod kalitesi
- ✅ Production-ready build sistemi

## 🔧 Komutlar

### Frontend Komutları

```bash
cd frontend

npm run dev          # Development server'ı başlat
npm run build        # Production build oluştur
npm run preview      # Build'i önizle
npm run lint         # Kodları lint'le
npm run lint:fix     # Lint hatalarını otomatik düzelt
npm run format       # Prettier ile kodu formatla
```

### Backend Komutları

```bash
npm start            # Server'ı başlat (production)
npm run dev          # Server'ı başlat (development - nodemon ile)
```

## 🌐 API Endpoints

### CV İşlemleri

- `GET /api/cvs` - Tüm CV kayıtlarını listele
- `POST /forms/cv-send` - Yeni CV yükle (multipart/form-data)
- `PUT /api/cvs/:id` - CV kaydını güncelle (admin token gerekli)
- `DELETE /api/cvs/:id` - CV kaydını sil (admin token gerekli)
- `GET /download/:id` - CV dosyasını indir

### Diğer

- `GET /ping` - Health check

## 🔐 Güvenlik

- Admin işlemleri (güncelleme/silme) için token doğrulaması
- CORS yapılandırması
- File upload limitleri (max 10MB)
- Güvenli dosya adlandırma

## 🎨 Tasarım

- Bootstrap 5 framework
- QuickStart teması (BootstrapMade)
- Custom CSS ile LuvaHr branding
- Responsive ve mobil uyumlu

## 📄 Lisans

Bu proje özel bir projedir. Ticari kullanım için izin gereklidir.

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add some amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- Website: [LuvaHr](https://luvahr.com)
- Email: arasy541@gmail.com
- Telefon: 0212 366 57 32

---

**Not:** Bu proje `react-conversion` branch'inde React'e dönüştürülmüştür. Eski HTML versiyonu `main` branch'inde bulunmaktadır.
