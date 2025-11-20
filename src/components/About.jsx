function About({ onCVModalOpen }) {
  return (
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
                <i className="bi bi-check-circle"></i>{' '}
                <span>
                  Bugün LuvaHR'da, her müşterimizin kültürünü, değerlerini ve ihtiyaçlarını derinlemesine anlayarak,
                  yalnızca pozisyona değil ekip dinamiğine de uyum sağlayacak doğru yetenekleri bulmaya odaklanıyoruz.
                </span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{' '}
                <span>
                  İletişime önem veren, şeffaf çalışan ve aday deneyimini merkeze koyan bir yaklaşım benimsiyoruz.
                </span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{' '}
                <span>
                  LuvaHR'ı kurma amacımız; işe alım sürecini firmalar için daha profesyonel, daha hızlı ve daha
                  öngörülebilir hale getirmekti.
                </span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{' '}
                <span>
                  İyi bir işe alım süreci, yalnızca bir pozisyon doldurmak değil; şirketin geleceğine değer katmaktır.
                </span>
              </li>
            </ul>
            <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); onCVModalOpen(); }}>
              <span>Cv Gönder</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
