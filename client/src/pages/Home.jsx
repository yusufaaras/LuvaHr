import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CVModal from '../components/CVModal';

function Home() {
  const [showCVModal, setShowCVModal] = useState(false);

  useEffect(() => {
    // Initialize AOS animations if available
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Load Bootstrap and other scripts
    const script = document.createElement('script');
    script.src = '/assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="index-page">
      <Header onCvClick={() => setShowCVModal(true)} />

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="fade-up"><span>LuvaHr'a Hoş Geldiniz</span></h1>
              <p data-aos="fade-up" data-aos-delay="100">
                İhtiyaç duyduğunuz doğru yetenekleri doğru fırsatlarla buluşturuyoruz.<br />
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200"></div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section id="featured-services" className="featured-services section light-background">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0"><i className="bi bi-briefcase"></i></div>
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Doğru Aday Konumlandırma</a></h4>
                    <p className="description">
                      Farklı sektörlerin ihtiyaçlarına uygun, kültürel uyumu yüksek en yetkin adayları
                      belirliyor ve doğru pozisyona yerleştiriyoruz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0"><i className="bi bi-card-checklist"></i></div>
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Yetenek Havuzu Yönetimi</a></h4>
                    <p className="description">
                      Geniş ve nitelikli yetenek havuzumuz ile şirketlerinize hızlı ve etkili işe alım
                      çözümleri sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0"><i className="bi bi-bar-chart"></i></div>
                  <div>
                    <h4 className="title"><a href="#" className="stretched-link">Stratejik İK Danışmanlığı</a></h4>
                    <p className="description">
                      İşe alım süreçlerinizden başlayarak, şirketinizin büyüme hedeflerine uygun
                      stratejik İK danışmanlığı ile yanınızdayız.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-12 content" data-aos="fade-up" data-aos-delay="100">
                <p className="who-we-are">Biz Kimiz</p>
                <h3>İşe Alımı Daha Profesyonel, Hızlı ve Öngörülebilir Hale Getiriyoruz</h3>
                <p className="fst-italic">
                  İnsan kaynakları dünyasında edindiğimiz yıllara dayanan deneyim boyunca, şirketlerin büyümesinde en kritik
                  unsurun doğru insanları doğru rollerle buluşturmak olduğunu deneyimledik. Sahip olduğumuz geçmiş deneyim
                  ve farklı sektörlerde yürüttüğümüz işe alım süreçleri, bize hem aday tarafını hem işveren tarafını çok iyi
                  anlama yeteneği kazandırdı.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>
                      Bugün LuvaHR'da, her müşterimizin kültürünü, değerlerini ve ihtiyaçlarını derinlemesine anlayarak,
                      yalnızca pozisyona değil ekip dinamiğine de uyum sağlayacak doğru yetenekleri bulmaya odaklanıyoruz.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>
                      İletişime önem veren, şeffaf çalışan ve aday deneyimini merkeze koyan bir yaklaşım benimsiyoruz.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>
                      LuvaHR'ı kurma amacımız; işe alım sürecini firmalar için daha profesyonel, daha hızlı ve daha
                      öngörülebilir hale getirmekti.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>
                    <span>
                      İyi bir işe alım süreci, yalnızca bir pozisyon doldurmak değil; şirketin geleceğine değer katmaktır.
                    </span>
                  </li>
                </ul>
                <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setShowCVModal(true); }}>
                  <span>Cv Gönder</span><i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>İletişim</h2>
            <p>Bizimle iletişime geçin</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-envelope"></i>
                  <h3>Email</h3>
                  <p>info@luvahr.com</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-telephone"></i>
                  <h3>Telefon</h3>
                  <p>+90 XXX XXX XX XX</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CVModal show={showCVModal} onClose={() => setShowCVModal(false)} />

      {/* Scroll Top Button */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}

export default Home;
