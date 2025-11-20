import { useState, useEffect } from 'react';

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', toggleVisible);
    toggleVisible();

    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a
      href="#"
      id="scroll-top"
      className={`scroll-top d-flex align-items-center justify-content-center ${visible ? 'active' : ''}`}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}

export default ScrollTop;
