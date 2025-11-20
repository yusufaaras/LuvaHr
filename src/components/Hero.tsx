function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="hero-bg">
        <img src="/public/assets/img/hero-bg-light.webp" alt="" />
      </div>
      <div className="container text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 data-aos="fade-up">
            <span>LuvaHr'a Hoş Geldiniz</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="100">
            İhtiyaç duyduğunuz doğru yetenekleri doğru fırsatlarla buluşturuyoruz.
            <br />
          </p>
          <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
          </div>
          <img 
            src="/public/assets/img/home1.png" 
            className="img-fluid hero-img" 
            alt="" 
            data-aos="zoom-out"
            data-aos-delay="300"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
