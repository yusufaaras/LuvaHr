function Features() {
  return (
    <section id="features" className="features section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Çözümlerimiz</h2>
        <p>
          Doğru yetenek. Doğru zaman. Doğru süreç. Hızlı, özenli ve kaliteli işe alım yaklaşımımızla büyümenizi
          hızlandırıyoruz.
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5 d-flex align-items-center">
            <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
              <li className="nav-item">
                <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                  <i className="bi bi-binoculars"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Yetkinlik Bazlı Değerlendirme</h4>
                    <p>
                      Adayların teknik ve davranışsal yetkinliklerini çeşitli envanter teslerimizle derinlemesine
                      analiz ederek, pozisyona en uygun ve kültürel olarak en uyumlu adayı belirliyoruz.
                    </p>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                  <i className="bi bi-box-seam"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Hızlı ve Özenli İşe Alım Süreci</h4>
                    <p>
                      Hızlı, özenli ve kaliteli işe alım yaklaşımımızla, pozisyonlarınızı en kısa sürede kapatıyor ve
                      şirketinizin büyümesini hızlandırıyoruz.
                    </p>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                  <i className="bi bi-brightness-high"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Doğru Yetenek Eşleştirme</h4>
                    <p>
                      Sadece teknik yeterliliğe değil, aynı zamanda kültürel uyuma ve uzun vadeli başarı potansiyeline
                      odaklanarak doğru yeteneği doğru pozisyona yerleştiriyoruz.
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-6">
            <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
              <div className="tab-pane fade active show" id="features-tab-1">
                <img src="/public/assets/img/uzmanlık.png" alt="" className="img-fluid" />
              </div>
              <div className="tab-pane fade" id="features-tab-2">
                <img src="/public/assets/img/tabs-2.jpeg" alt="" className="img-fluid" />
              </div>
              <div className="tab-pane fade" id="features-tab-3">
                <img src="/public/assets/img/tabs-3.jpeg" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
