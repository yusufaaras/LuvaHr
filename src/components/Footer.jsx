import { useState } from 'react';

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, error: '', success: false });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus({ loading: true, error: '', success: false });

    try {
      const response = await fetch('/forms/newsletter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: newsletterEmail }).toString()
      });

      if (response.ok) {
        setNewsletterStatus({ loading: false, error: '', success: true });
        setNewsletterEmail('');
      } else {
        setNewsletterStatus({ loading: false, error: 'Abonelik işlemi başarısız.', success: false });
      }
    } catch {
      setNewsletterStatus({ loading: false, error: 'Abonelik işlemi başarısız.', success: false });
    }
  };

  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">LuvaHr</span>
            </a>
            <div className="footer-contact pt-3">
              <p>İstanbul, Türkiye</p>
              <p className="mt-3">
                <strong>Telefon:</strong> <span>+90 XXX XXX XX XX</span>
              </p>
              <p>
                <strong>E-posta:</strong> <span>info@luvahr.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Faydalı Bağlantılar</h4>
            <ul>
              <li>
                <a href="#">Anasayfa</a>
              </li>
              <li>
                <a href="#">Hakkımızda</a>
              </li>
              <li>
                <a href="#">Kullanım Şartları</a>
              </li>
              <li>
                <a href="#">Gizlilik Politikası</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Diğer Bağlantılar</h4>
            <ul>
              <li>
                <a href="#">Uzman Personel İşe Alımı</a>
              </li>
              <li>
                <a href="#">Üst Düzey Yönetici İşe Alımı</a>
              </li>
              <li>
                <a href="#">Kurumsal İK Danışmanlığı</a>
              </li>
              <li>
                <a href="#">Yetenek Havuzu Yönetimi</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>E-Bültenimize Abone Olun</h4>
            <p>E-bültenimize abone olarak ürünlerimiz ve hizmetlerimiz hakkındaki en son haberleri alın!</p>
            <form onSubmit={handleNewsletterSubmit} className="php-email-form">
              <div className="newsletter-form">
                <input
                  type="email"
                  name="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <input type="submit" value="Abone Ol" />
              </div>
              {newsletterStatus.loading && <div className="loading">Yükleniyor</div>}
              {newsletterStatus.error && <div className="error-message">{newsletterStatus.error}</div>}
              {newsletterStatus.success && <div className="sent-message">Abonelik talebiniz gönderildi. Teşekkürler!</div>}
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Telif Hakkı</span> <strong className="px-1 sitename">LuvaHr</strong>
          <span>Tüm Hakları Saklıdır</span>
        </p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Dist
          <a href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
