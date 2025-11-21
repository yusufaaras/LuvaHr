import { Link } from 'react-router-dom';

const Header = ({ onCvModalOpen }) => {
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">LuvaHr</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active">Anasayfa</a></li>
            <li><a href="#about">Hakkımızda</a></li>
            <li><a href="#features">Çözümlerimiz</a></li>
            <li><a href="#contact">İletişim</a></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a className="btn-getstarted" href="#" onClick={onCvModalOpen}>
          CV Gönder
        </a>
      </div>
    </header>
  );
};

export default Header;
