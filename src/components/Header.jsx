import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ onCVModalOpen }) {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const toggleScrolled = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', toggleScrolled);
    toggleScrolled();

    return () => window.removeEventListener('scroll', toggleScrolled);
  }, []);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  const closeMobileNav = () => {
    setMobileNavActive(false);
  };

  useEffect(() => {
    if (mobileNavActive) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
  }, [mobileNavActive]);

  useEffect(() => {
    if (scrolled) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }, [scrolled]);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">LuvaHr</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#hero" className="active" onClick={closeMobileNav}>Anasayfa</a></li>
            <li><a href="#about" onClick={closeMobileNav}>Hakkımızda</a></li>
            <li><a href="#features" onClick={closeMobileNav}>Çözümlerimiz</a></li>
            <li><a href="#contact" onClick={closeMobileNav}>İletişim</a></li>
          </ul>
          <i 
            className={`mobile-nav-toggle d-xl-none bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          ></i>
        </nav>

        <a className="btn-getstarted" href="#" onClick={(e) => { e.preventDefault(); onCVModalOpen(); }}>
          Cv Gönder
        </a>
      </div>
    </header>
  );
}

export default Header;
