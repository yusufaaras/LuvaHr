import { useState } from 'react';

function Features() {
  const [activeTab, setActiveTab] = useState('features-tab-1');

  const tabs = [
    {
      id: 'features-tab-1',
      icon: 'bi-binoculars',
      title: 'Yetkinlik Bazlı Değerlendirme',
      description: 'Adayların teknik ve davranışsal yetkinliklerini çeşitli envanter teslerimizle derinlemesine analiz ederek, pozisyona en uygun ve kültürel olarak en uyumlu adayı belirliyoruz.',
      image: '/assets/img/uzmanlık.png',
      delay: '100'
    },
    {
      id: 'features-tab-2',
      icon: 'bi-box-seam',
      title: 'Hızlı ve Özenli İşe Alım Süreci',
      description: 'Hızlı, özenli ve kaliteli işe alım yaklaşımımızla, pozisyonlarınızı en kısa sürede kapatıyor ve şirketinizin büyümesini hızlandırıyoruz.',
      image: '/assets/img/tabs-2.jpeg',
      delay: '100'
    },
    {
      id: 'features-tab-3',
      icon: 'bi-brightness-high',
      title: 'Doğru Yetenek Eşleştirme',
      description: 'Sadece teknik yeterliliğe değil, aynı zamanda kültürel uyuma ve uzun vadeli başarı potansiyeline odaklanarak doğru yeteneği doğru pozisyona yerleştiriyoruz.',
      image: '/assets/img/tabs-3.jpeg',
      delay: '100'
    }
  ];

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
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <a
                    className={`nav-link ${activeTab === tab.id ? 'active show' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.id);
                    }}
                    href={`#${tab.id}`}
                  >
                    <i className={`bi ${tab.icon}`}></i>
                    <div>
                      <h4 className="d-none d-lg-block">{tab.title}</h4>
                      <p>{tab.description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-6">
            <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
              {tabs.map((tab) => (
                <div
                  className={`tab-pane fade ${activeTab === tab.id ? 'active show' : ''}`}
                  id={tab.id}
                  key={tab.id}
                >
                  <img src={tab.image} alt="" className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
