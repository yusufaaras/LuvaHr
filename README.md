# LuvaHr - İnsan Kaynakları ve Yönetim Danışmanlığı

LuvaHr, farklı sektörlere yönelik profesyonel insan kaynakları, yönetim ve işe alım danışmanlığı hizmetleri sunan bir React uygulamasıdır. Bu proje, Vite ve React kullanılarak modern bir web uygulamasına dönüştürülmüştür.

## 🚀 Teknolojiler

- **React 19.2.0** - Modern kullanıcı arayüzü geliştirme
- **Vite 7.2.4** - Hızlı build ve geliştirme sunucusu
- **React Router DOM 7.9.6** - Sayfa yönlendirme
- **Bootstrap 5** - Responsive tasarım ve bileşenler
- **AOS (Animate On Scroll)** - Scroll animasyonları
- **GLightbox** - Lightbox galeri
- **Swiper** - Modern slider/carousel

## 📋 Gereksinimler

Projeyi çalıştırmak için aşağıdaki yazılımların yüklü olması gerekmektedir:

- Node.js (v16 veya üzeri)
- npm (v7 veya üzeri)

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yusufaaras/LuvaHr.git
cd LuvaHr
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

## 💻 Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
# veya
npm start
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## 🏗️ Build (Derleme)

Üretime hazır sürüm oluşturmak için:

```bash
npm run build
```

Build edilen dosyalar `dist/` klasöründe oluşturulacaktır.

## 👀 Önizleme

Build edilmiş uygulamayı önizlemek için:

```bash
npm run preview
```

## 🧹 Linting

Kod kalitesini kontrol etmek için:

```bash
npm run lint
```

## 📁 Proje Yapısı

```
LuvaHr/
├── public/                    # Statik dosyalar
│   ├── assets/               # CSS, JS, resimler, ikonlar
│   │   ├── css/             # Stil dosyaları
│   │   ├── img/             # Resimler
│   │   ├── js/              # JavaScript dosyaları
│   │   └── vendor/          # Üçüncü taraf kütüphaneler
│   └── forms/               # PHP form işleme dosyaları
├── src/                      # React kaynak kodları
│   ├── components/          # React bileşenleri
│   │   ├── Header.jsx       # Başlık ve navigasyon
│   │   ├── Hero.jsx         # Ana banner
│   │   ├── FeaturedServices.jsx
│   │   ├── About.jsx        # Hakkımızda
│   │   ├── Features.jsx     # Özellikler (tab sistemi)
│   │   ├── MoreFeatures.jsx
│   │   ├── FAQ.jsx          # Sıkça sorulan sorular
│   │   ├── Contact.jsx      # İletişim formu
│   │   ├── Footer.jsx       # Alt bilgi
│   │   ├── ScrollTop.jsx    # Yukarı kaydırma butonu
│   │   └── CVModal.jsx      # CV gönderme modal
│   ├── pages/               # Sayfa bileşenleri
│   │   └── Home.jsx         # Ana sayfa
│   ├── App.jsx              # Ana uygulama bileşeni
│   └── main.jsx             # Giriş noktası
├── index.html               # HTML şablonu
├── package.json             # Proje bağımlılıkları
├── vite.config.js           # Vite yapılandırması
└── README.md                # Bu dosya
```

## 🎨 Özellikler

- ✅ Responsive (mobil uyumlu) tasarım
- ✅ Modern ve kullanıcı dostu arayüz
- ✅ Scroll animasyonları (AOS)
- ✅ CV gönderme modal sistemi
- ✅ İletişim formu
- ✅ E-bülten abonelik sistemi
- ✅ Sıkça sorulan sorular (FAQ) accordion
- ✅ Özellik gösterimi için tab sistemi
- ✅ Yumuşak scroll navigasyonu
- ✅ Mobil menü desteği

## 🔌 Backend Entegrasyonu

Projede PHP ile yazılmış form işleme scriptleri bulunmaktadır:

- `public/forms/contact.php` - İletişim formu
- `public/forms/cv-send.php` - CV gönderme formu
- `public/forms/newsletter.php` - E-bülten abonelik formu

Bu dosyalar bir PHP sunucusunda çalışacak şekilde yapılandırılmıştır. Formlar şu anda `arasy541@gmail.com` adresine e-posta gönderecek şekilde ayarlanmıştır.

### Backend Ayarları

Eğer farklı bir backend kullanmak isterseniz, `src/components/` klasöründeki ilgili bileşenlerde form submission URL'lerini güncelleyebilirsiniz.

## 🌐 Deploy (Dağıtım)

### Vercel'e Deploy

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Build ayarları:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy butonuna tıklayın

### Netlify'a Deploy

1. [Netlify](https://netlify.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Build ayarları:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy butonuna tıklayın

### Manuel Deploy

1. Build oluşturun:
```bash
npm run build
```

2. `dist/` klasörünün içeriğini web sunucunuza yükleyin

**Not:** PHP formlarının çalışması için sunucunuzda PHP desteği olması gerekmektedir.

## 🔒 Güvenlik

- KVKK ve veri koruma standartlarına uygun form işleme
- XSS ve CSRF koruması için form validasyonu
- Güvenli dosya yükleme (CV gönderme)

## 📝 Lisans

Bu proje [BootstrapMade](https://bootstrapmade.com/) QuickStart teması üzerine inşa edilmiştir.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

LuvaHr - İnsan Kaynakları ve Yönetim Danışmanlığı

- E-posta: info@luvahr.com
- Web: [luvahr.com](https://luvahr.com)

## �� Bilinen Sorunlar

- PHP form işleme dosyaları production ortamında test edilmemiştir
- Sosyal medya linkleri şu anda placeholder'dır
- İletişim bilgileri (telefon numarası, adres) güncellenmelidir

## 🔄 Geçmiş Sürümlerden Farklılıklar

Bu proje, orijinal HTML/CSS/JS yapısından React'e dönüştürülmüştür. Ana farklılıklar:

- ✅ Bileşen tabanlı mimari
- ✅ Modern React hook'ları kullanımı
- ✅ React Router ile sayfa yönetimi
- ✅ State management için React state
- ✅ Vite ile hızlı build ve geliştirme
- ✅ Daha iyi kod organizasyonu ve bakım kolaylığı

## 📚 Daha Fazla Bilgi

- [React Dokümantasyonu](https://react.dev/)
- [Vite Dokümantasyonu](https://vitejs.dev/)
- [React Router Dokümantasyonu](https://reactrouter.com/)
