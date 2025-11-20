function MoreFeatures() {
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
              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-easel flex-shrink-0"></i>
                <div>
                  <h4>Geniş Sektör Deneyimi</h4>
                  <p>Farklı sektörlere yönelik derin bilgi birikimi ve her alanda kanıtlanmış tecrübe.</p>
                </div>
              </div>
              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-patch-check flex-shrink-0"></i>
                <div>
                  <h4>Hız ve Verimlilik</h4>
                  <p>Geniş aday havuzumuz ve optimize süreçlerimiz sayesinde hızlı ve verimli işe alım garantisi.</p>
                </div>
              </div>
              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-brightness-high flex-shrink-0"></i>
                <div>
                  <h4>Kültürel Uyum</h4>
                  <p>Adayın sadece yetkinlikleri değil, şirket kültürüne uyumu da önceliğimizdir.</p>
                </div>
              </div>
              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-brightness-high flex-shrink-0"></i>
                <div>
                  <h4>Gizlilik ve Güven</h4>
                  <p>Tüm işe alım ve danışmanlık süreçlerinde mutlak gizlilik ve güven sağlıyoruz.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
            <img src="/public/assets/img/features-3.jpeg" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoreFeatures
