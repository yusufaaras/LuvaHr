import { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CVUploadModal from '../common/CVUploadModal';

const Home = () => {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const handleCvModalOpen = (e) => {
    e.preventDefault();
    setIsCvModalOpen(true);
  };

  const handleCvModalClose = () => {
    setIsCvModalOpen(false);
  };

  return (
    <div className="index-page">
      <Header onCvModalOpen={handleCvModalOpen} />

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="fade-up">
                <span>LuvaHr'a Hoş Geldiniz</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                İhtiyaç duyduğunuz doğru yetenekleri doğru fırsatlarla buluşturuyoruz.
                <br />
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
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Doğru Aday Konumlandırma
                      </a>
                    </h4>
                    <p className="description">
                      Farklı sektörlerin ihtiyaçlarına uygun, kültürel uyumu yüksek en yetkin adayları belirliyor ve doğru pozisyona yerleştiriyoruz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Yetenek Havuzu Yönetimi
                      </a>
                    </h4>
                    <p className="description">
                      Geniş ve nitelikli yetenek havuzumuz ile şirketlerinize hızlı ve etkili işe alım çözümleri sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-bar-chart"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Stratejik İK Danışmanlığı
                      </a>
                    </h4>
                    <p className="description">
                      Kurumsal hedeflerinize ulaşmanız için stratejik insan kaynakları danışmanlığı ve çözüm ortaklığı sunuyoruz.
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
              <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
                <p className="who-we-are">Biz Kimiz</p>
                <h3>İnsan Kaynakları ve Yönetim Danışmanlığında Uzman Ekip</h3>
                <p className="fst-italic">
                  LuvaHr olarak, farklı sektörlerdeki şirketlere profesyonel insan kaynakları ve yönetim danışmanlığı hizmeti sunuyoruz.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> <span>Nitelikli adaylarla şirketleri buluşturuyoruz.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> <span>Stratejik işe alım ve yetenek yönetimi çözümleri sağlıyoruz.</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> <span>Kurumsal başarı için uzun vadeli ortaklıklar kuruyoruz.</span>
                  </li>
                </ul>
                <a href="#" className="read-more">
                  <span>Daha Fazla Bilgi</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>

              <div className="col-lg-6 about-images" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <img src="/assets/img/about-company-1.jpg" className="img-fluid" alt="" />
                  </div>
                  <div className="col-lg-6">
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <img src="/assets/img/about-company-2.jpg" className="img-fluid" alt="" />
                      </div>
                      <div className="col-lg-12">
                        <img src="/assets/img/about-company-3.jpg" className="img-fluid" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Uzmanlıklarımız</h2>
            <p>Farklı sektörlere yönelik özel çözümler sunuyoruz</p>
          </div>

          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 d-flex align-items-center">
                <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
                  <li className="nav-item">
                    <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                      <i className="bi bi-building"></i>
                      <div>
                        <h4 className="d-none d-lg-block">Kurumsal İK Danışmanlığı</h4>
                        <p>İşletmenizin insan kaynakları süreçlerini optimize ediyoruz.</p>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                      <i className="bi bi-person-check"></i>
                      <div>
                        <h4 className="d-none d-lg-block">Uzman Personel İşe Alımı</h4>
                        <p>Pozisyonlarınıza en uygun uzman adayları buluyoruz.</p>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                      <i className="bi bi-award"></i>
                      <div>
                        <h4 className="d-none d-lg-block">Üst Düzey Yönetici İşe Alımı</h4>
                        <p>C-level pozisyonlar için lider profiller sunuyoruz.</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6">
                <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
                  <div className="tab-pane fade active show" id="features-tab-1">
                    <img src="/assets/img/tabs-1.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="tab-pane fade" id="features-tab-2">
                    <img src="/assets/img/tabs-2.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="tab-pane fade" id="features-tab-3">
                    <img src="/assets/img/tabs-3.jpg" alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>İletişim</h2>
            <p>Bize ulaşın, size yardımcı olalım</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Adres</h3>
                  <p>Maslak Mah. Bilim Sok. Sun Plaza Kat:13 No:5/A</p>
                  <p>SARIYER / İSTANBUL</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-telephone"></i>
                  <h3>Telefon</h3>
                  <p>0212 366 57 32</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-envelope"></i>
                  <h3>E-posta</h3>
                  <p>arasy541@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="row gy-4 mt-1">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.7845934186854!2d29.011905!3d41.085536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sSun%20Plaza!5e0!3m2!1sen!2str!4v1234567890123!5m2!1sen!2str"
                  frameBorder="0"
                  style={{ border: 0, width: '100%', height: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="col-lg-6">
                <form action="/forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="400">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control" placeholder="Adınız" required />
                    </div>

                    <div className="col-md-6">
                      <input type="email" className="form-control" name="email" placeholder="E-posta" required />
                    </div>

                    <div className="col-md-12">
                      <input type="text" className="form-control" name="subject" placeholder="Konu" required />
                    </div>

                    <div className="col-md-12">
                      <textarea className="form-control" name="message" rows="6" placeholder="Mesajınız" required></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Yükleniyor</div>
                      <div className="error-message"></div>
                      <div className="sent-message">Mesajınız gönderildi. Teşekkürler!</div>

                      <button type="submit">Mesaj Gönder</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to top button */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      <div id="preloader"></div>

      {/* CV Upload Modal */}
      <CVUploadModal isOpen={isCvModalOpen} onClose={handleCvModalClose} />
    </div>
  );
};

export default Home;
