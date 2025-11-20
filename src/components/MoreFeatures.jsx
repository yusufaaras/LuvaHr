function MoreFeatures() {
  const features = [
    {
      icon: 'bi-easel',
      title: 'Geniş Sektör Deneyimi',
      description: 'Farklı sektörlere yönelik derin bilgi birikimi ve her alanda kanıtlanmış tecrübe.'
    },
    {
      icon: 'bi-patch-check',
      title: 'Hız ve Verimlilik',
      description: 'Geniş aday havuzumuz ve optimize süreçlerimiz sayesinde hızlı ve verimli işe alım garantisi.'
    },
    {
      icon: 'bi-brightness-high',
      title: 'Kültürel Uyum',
      description: 'Adayın sadece yetkinlikleri değil, şirket kültürüne uyumu da önceliğimizdir.'
    },
    {
      icon: 'bi-brightness-high',
      title: 'Gizlilik ve Güven',
      description: 'Tüm işe alım ve danışmanlık süreçlerinde mutlak gizlilik ve güven sağlıyoruz.'
    }
  ];

  return (
    <section id="more-features" className="more-features section">
      <div className="container">
        <div className="row justify-content-around gy-4">
          <div className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
            <h3>Neden LuvaHr'ı Tercih Etmelisiniz?</h3>
            <p>
              Deneyimimiz, farklı sektörlerdeki geniş bilgi birikimimiz ve doğru eşleştirme vizyonumuzla, işe alım
              süreçlerinizde verimlilik ve kalitede fark yaratıyoruz. Sizin için en uygun çözümü sunmak için buradayız.
            </p>

            <div className="row">
              {features.map((feature, index) => (
                <div className="col-lg-6 icon-box d-flex" key={index}>
                  <i className={`bi ${feature.icon} flex-shrink-0`}></i>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
            <img src="/assets/img/features-3.jpeg" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoreFeatures;
