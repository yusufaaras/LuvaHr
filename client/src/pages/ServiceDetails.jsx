import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import CVModal from '../components/CVModal';

function ServiceDetails() {
  const { id } = useParams();
  const [showCVModal, setShowCVModal] = useState(false);

  return (
    <div className="service-details-page">
      <Header onCvClick={() => setShowCVModal(true)} />
      
      <main className="main">
        <div className="page-title">
          <div className="container">
            <h1>Hizmet Detayları</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Anasayfa</a></li>
                <li className="current">Hizmet Detayları</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="service-details section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8">
                <h3>Hizmet ID: {id}</h3>
                <p>
                  LuvaHr olarak, şirketlerin en değerli varlığı olan insan kaynağını yönetme ve 
                  geliştirme konusunda uzman desteği sağlıyoruz.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> Profesyonel işe alım süreçleri</li>
                  <li><i className="bi bi-check-circle"></i> Yetenek yönetimi ve geliştirme</li>
                  <li><i className="bi bi-check-circle"></i> İK danışmanlığı hizmetleri</li>
                </ul>
              </div>

              <div className="col-lg-4">
                <div className="service-box">
                  <h4>Hizmetlerimiz</h4>
                  <div className="services-list">
                    <a href="#"><i className="bi bi-arrow-right-circle"></i><span>İşe Alım</span></a>
                    <a href="#"><i className="bi bi-arrow-right-circle"></i><span>Yönetim Danışmanlığı</span></a>
                    <a href="#"><i className="bi bi-arrow-right-circle"></i><span>Eğitim ve Gelişim</span></a>
                    <a href="#"><i className="bi bi-arrow-right-circle"></i><span>Performans Yönetimi</span></a>
                  </div>
                </div>

                <div className="service-box mt-4">
                  <h4>CV Gönderin</h4>
                  <p>Yeteneklerinizi bizimle paylaşın.</p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => setShowCVModal(true)}
                  >
                    CV Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CVModal show={showCVModal} onClose={() => setShowCVModal(false)} />
    </div>
  );
}

export default ServiceDetails;
