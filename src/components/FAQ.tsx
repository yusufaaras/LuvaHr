import { useEffect } from 'react'

function FAQ() {
  useEffect(() => {
    // FAQ toggle functionality
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        const parentElement = faqItem.parentElement
        if (parentElement) {
          parentElement.classList.toggle('faq-active')
        }
      })
    })
  }, [])

  return (
    <section id="faq" className="faq section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Sıkça Sorulan Sorular (SSS)</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              <div className="faq-item faq-active">
                <h3>LuvaHr hangi sektörlere hizmet vermektedir?</h3>
                <div className="faq-content">
                  <p>
                    LuvaHr, tek bir sektörle sınırlı kalmayarak, Teknoloji, Üretim, Perakende, Finans, Lojistik ve
                    daha birçok farklı sektördeki şirketlere insan kaynakları danışmanlığı hizmeti vermektedir.
                    Uzmanlığımız, pozisyonun ve şirketin ihtiyaçlarını derinlemesine anlamamızdan gelmektedir.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>

              <div className="faq-item">
                <h3>Doğru adayı doğru şirkete nasıl konumlandırıyorsunuz?</h3>
                <div className="faq-content">
                  <p>
                    Adayların sadece teknik/mesleki yetkinliklerini değil, aynı zamanda şirket kültürüne ve takım
                    dinamiklerine uyumunu da kapsamlı değerlendirme yöntemleriyle analiz ediyor ve en doğru eşleştirmeyi
                    yapıyoruz.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>

              <div className="faq-item">
                <h3>İşe alım süreci ortalama ne kadar sürer?</h3>
                <div className="faq-content">
                  <p>
                    Pozisyonun uzmanlık seviyesi ve karmaşıklığına bağlı olmakla birlikte, geniş ve aktif aday
                    havuzumuz sayesinde süreci rakiplerimize göre daha hızlı ve verimli tamamlıyoruz. Ortalama süre proje bazında
                    değişmektedir.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>

              <div className="faq-item">
                <h3>Sunduğunuz ek İK danışmanlık hizmetleri nelerdir?</h3>
                <div className="faq-content">
                  <p>
                    İşe alımın yanı sıra, kurumsal eğitimler, performans yönetim sistemi kurulumu, yetenek yönetimi
                    stratejileri ve öz-süreç yönetimi gibi konularda da destek sağlıyoruz.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>

              <div className="faq-item">
                <h3>Küçük ölçekli şirketler de hizmet alabilir mi?</h3>
                <div className="faq-content">
                  <p>
                    Elbette. Hizmet paketlerimiz, yeni kurulmuş startup'lardan köklü kurumsal firmalara kadar her
                    ölçekteki şirketin ihtiyaçlarına uygun esneklikte tasarlanmıştır. İhtiyaçlarınıza özel bir plan
                    oluşturabiliriz.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>

              <div className="faq-item">
                <h3>Gizlilik politikanız hakkında bilgi alabilir miyim?</h3>
                <div className="faq-content">
                  <p>
                    Tüm müşteri ve aday bilgilerinin gizliliği en büyük önceliğimizdir. Süreçlerimizde KVKK'ya tam
                    uyumluluk ve etik kurallar çerçevesinde mutlak gizlilik sağlanır.
                  </p>
                </div>
                <i className="faq-toggle bi bi-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
