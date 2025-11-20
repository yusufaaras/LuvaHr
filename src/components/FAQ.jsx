import { useState } from 'react';

function FAQ() {
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      question: 'LuvaHr hangi sektörlere hizmet vermektedir?',
      answer: 'LuvaHr, tek bir sektörle sınırlı kalmayarak, Teknoloji, Üretim, Perakende, Finans, Lojistik ve daha birçok farklı sektördeki şirketlere insan kaynakları danışmanlığı hizmeti vermektedir. Uzmanlığımız, pozisyonun ve şirketin ihtiyaçlarını derinlemesine anlamamızdan gelmektedir.'
    },
    {
      question: 'Doğru adayı doğru şirkete nasıl konumlandırıyorsunuz?',
      answer: 'Adayların sadece teknik/mesleki yetkinliklerini değil, aynı zamanda şirket kültürüne ve takım dinamiklerine uyumunu da kapsamlı değerlendirme yöntemleriyle analiz ediyor ve en doğru eşleştirmeyi sağlıyoruz. Her pozisyon için hem işveren hem de aday perspektifinden detaylı bir analiz yapıyoruz.'
    },
    {
      question: 'İşe alım süreci ne kadar sürer?',
      answer: 'Geniş aday havuzumuz ve optimize süreçlerimiz sayesinde, süreç genellikle ortalama 2-4 hafta arasında tamamlanabilir. Ancak pozisyonun özelliğine, sektörüne ve gereksinimlere göre bu süre değişiklik gösterebilir. Hızlı işe alım yaklaşımımız, kaliteden ödün vermeden en uygun adayları en kısa sürede belirlememizi sağlar.'
    },
    {
      question: 'Hangi pozisyon seviyeleri için hizmet sunuyorsunuz?',
      answer: 'LuvaHr olarak, uzman personel aramalarından üst düzey yönetici işe alımına kadar geniş bir yelpazede hizmet sunuyoruz. Genç profesyonellerden C-Level yöneticilere kadar her seviyede işe alım danışmanlığı ve yetenek eşleştirme hizmeti sağlamaktayız.'
    },
    {
      question: 'Gizlilik ve veri güvenliği konusunda ne gibi önlemler alıyorsunuz?',
      answer: 'Tüm işe alım süreçlerinde aday ve şirket bilgilerinin gizliliğini en üst düzeyde tutuyoruz. KVKK ve uluslararası veri koruma standartlarına uygun olarak hareket ediyor, hassas bilgilerin saklanması ve paylaşılmasında katı prosedürler uyguluyoruz. Müşteri ve aday verilerini üçüncü şahıslarla paylaşmıyoruz.'
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Sıkça Sorulan Sorular (SSS)</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item ${activeFaq === index ? 'faq-active' : ''}`}
                  key={index}
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i className="faq-toggle bi bi-chevron-right"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
