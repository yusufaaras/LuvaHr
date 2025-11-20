# LuvaHr - İnsan Kaynakları ve Yönetim Danışmanlığı

Modern React + TypeScript web uygulaması.

## 🚀 Özellikler

- ⚛️ React 18 ile geliştirildi
- 🔷 TypeScript ile tip güvenliği
- ⚡ Vite build tool (hızlı geliştirme ve derleme)
- 🎨 Bootstrap 5.3.3 ile responsive tasarım
- 📝 ESLint ile kod kalitesi kontrolü
- 🎭 AOS (Animate on Scroll) animasyonları
- 📸 GLightbox galeri desteği
- 📧 İletişim ve CV gönderme formları

## 📋 Gereksinimler

- Node.js 16.x veya üzeri
- npm veya yarn

## 🛠️ Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/yusufaaras/LuvaHr.git
cd LuvaHr
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

## 🎯 Kullanım

### Geliştirme Modu

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

### Production Build

Production için optimize edilmiş build oluşturmak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

### Production Önizleme

Build'i yerel olarak önizlemek için:

```bash
npm run preview
```

### Linting

Kod kalitesini kontrol etmek için:

```bash
npm run lint
```

## 📁 Proje Yapısı

```
LuvaHr/
├── public/                  # Statik dosyalar
│   ├── assets/             # CSS, JS, resimler, vendor kütüphaneleri
│   └── forms/              # PHP form işleme dosyaları
├── src/                    # Kaynak kodlar
│   ├── components/         # React bileşenleri
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── FeaturedServices.tsx
│   │   ├── About.tsx
│   │   ├── Features.tsx
│   │   ├── MoreFeatures.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── CVModal.tsx
│   ├── types/              # TypeScript tip tanımları
│   │   └── index.ts
│   ├── App.tsx             # Ana uygulama bileşeni
│   ├── main.tsx            # Uygulama giriş noktası
│   └── index.css           # Global stiller
├── index.html              # HTML şablonu
├── package.json            # Proje bağımlılıkları
├── tsconfig.json           # TypeScript yapılandırması
├── vite.config.ts          # Vite yapılandırması
└── .eslintrc.cjs           # ESLint yapılandırması
```

## 🔧 Yapılandırma

### TypeScript

`tsconfig.json` dosyası React + TypeScript projeleri için optimize edilmiştir:
- Strict mode etkin
- JSX desteği (`react-jsx`)
- Modern ES özelikleri (ES2020)

### Vite

`vite.config.ts` dosyasında build ayarları yapılandırılmıştır:
- Base path: `./` (relative paths)
- Dev server port: 3000

### ESLint

`.eslintrc.cjs` dosyasında kod kalitesi kuralları tanımlanmıştır:
- TypeScript desteği
- React Hooks kuralları
- React Refresh plugin

## 📝 Bileşenler

### Header
- Navigasyon menüsü
- Mobil menü desteği
- CV gönderme butonu

### Hero
- Ana başlık ve slogan
- Animasyonlu hero image

### FeaturedServices
- Üç ana hizmet kartı
- İkonlar ve açıklamalar

### About
- Şirket hakkında bilgi
- Değer önerileri listesi

### Features
- Tab menülü özellik showcase
- Her tab için ayrı görsel

### MoreFeatures
- Neden LuvaHr seçenekleri
- İkon kutular ile bilgi sunumu

### FAQ
- Sıkça sorulan sorular
- Açılır/kapanır accordion

### Contact
- İletişim bilgileri
- İletişim formu
- Google Maps entegrasyonu

### Footer
- Site bağlantıları
- E-bülten abonelik formu
- Sosyal medya linkleri

### CVModal
- CV yükleme formu
- Dosya seçici
- Form validasyonu

## 🎨 Stil Sistemi

- Bootstrap 5.3.3 temel CSS framework
- Bootstrap Icons
- AOS (Animate on Scroll)
- GLightbox
- Swiper
- Özel CSS (main.css)

## 📧 Form İşleme

Formlar PHP backend'e POST edilir:
- `/public/forms/contact.php` - İletişim formu
- `/public/forms/cv-send.php` - CV gönderme
- `/public/forms/newsletter.php` - E-bülten aboneliği

## 🔒 Tip Güvenliği

TypeScript tip tanımları `src/types/index.ts` dosyasında:
- `CVFormData` - CV formu verileri
- `ContactFormData` - İletişim formu verileri
- `NewsletterFormData` - E-bülten formu verileri
- Component prop interfaces

## 🌐 Tarayıcı Desteği

Modern tarayıcılar:
- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 📄 Lisans

Bu proje özel mülkiyettir. Tüm hakları saklıdır.

## 👥 İletişim

**LuvaHr İnsan Kaynakları ve Yönetim Danışmanlığı**

- 📍 Maslak Mah. Bilim Sok. Sun Plaza Kat:13 No:5/A, SARIYER / İSTANBUL
- 📞 0212 366 57 32
- 📧 arasy541@gmail.com

---

Template: QuickStart by [BootstrapMade](https://bootstrapmade.com/)
