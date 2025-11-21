function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">LuvaHr</span>
            </a>
            <div className="footer-contact pt-3">
              <p>İnsan Kaynakları ve Yönetim Danışmanlığı</p>
              <p className="mt-3"><strong>Email:</strong> <span>info@luvahr.com</span></p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 footer-links">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><a href="/#hero">Anasayfa</a></li>
              <li><a href="/#about">Hakkımızda</a></li>
              <li><a href="/#features">Çözümlerimiz</a></li>
              <li><a href="/#contact">İletişim</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Bize Ulaşın</h4>
            <p>İnsan kaynakları ihtiyaçlarınız için bizimle iletişime geçin.</p>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">LuvaHr</strong> <span>All Rights Reserved</span></p>
      </div>
    </footer>
  );
}

export default Footer;
