function FeaturedServices() {
  return (
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
                  <a href="#" className="stretched-link">Doğru Aday Konumlandırma</a>
                </h4>
                <p className="description">
                  Farklı sektörlerin ihtiyaçlarına uygun, kültürel uyumu yüksek en yetkin adayları
                  belirliyor ve doğru pozisyona yerleştiriyoruz.
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
                  <a href="#" className="stretched-link">Yetenek Havuzu Yönetimi</a>
                </h4>
                <p className="description">
                  Geniş ve nitelikli yetenek havuzumuz ile şirketlerinize hızlı ve etkili işe alım
                  çözümleri sunuyoruz.
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
                  <a href="#" className="stretched-link">Stratejik İK Danışmanlığı</a>
                </h4>
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
  );
}

export default FeaturedServices;
