import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import CVModal from '../components/CVModal';

function StarterPage() {
  const [showCVModal, setShowCVModal] = useState(false);

  return (
    <div className="starter-page-page">
      <Header onCvClick={() => setShowCVModal(true)} />
      
      <main className="main">
        <div className="page-title">
          <div className="container">
            <h1>Başlangıç Sayfası</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Anasayfa</a></li>
                <li className="current">Başlangıç</li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="starter-section section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-12">
                <h2>LuvaHr'a Hoş Geldiniz</h2>
                <p>
                  İnsan kaynakları yönetiminde profesyonel çözümler sunuyoruz. 
                  Şirketinizin başarısı için doğru yetenekleri bulmanıza yardımcı oluyoruz.
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-people"></i>
                      <h4>Deneyimli Ekip</h4>
                      <p>Sektörde uzman kadromuz</p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-graph-up"></i>
                      <h4>Kanıtlanmış Başarı</h4>
                      <p>Yüzlerce başarılı proje</p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="info-box">
                      <i className="bi bi-hand-thumbs-up"></i>
                      <h4>Müşteri Memnuniyeti</h4>
                      <p>%95+ müşteri memnuniyeti</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowCVModal(true)}
                  >
                    <i className="bi bi-file-earmark-arrow-up"></i> CV Gönder
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

export default StarterPage;
