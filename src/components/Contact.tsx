import { useState, FormEvent } from 'react'
import { ContactFormData } from '../types'

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.message)

      const response = await fetch('/public/forms/contact.php', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setSuccessMessage('Mesajınız başarıyla gönderildi. Teşekkür ederiz!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setErrorMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setErrorMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>İletişim</h2>
        <p>
          Bize ulaşmak için aşağıdaki iletişim bilgilerini kullanabilir veya formu doldurarak talebinizi
          iletebilirsiniz.
        </p>
      </div>
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-geo-alt"></i>
              <h3>Adres</h3>
              <p>Maslak Mah. Bilim Sok. Sun Plaza Kat:13 No:5/A<br />SARIYER / İSTANBUL</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-telephone"></i>
              <h3>Bizi Arayın</h3>
              <p>0212 366 57 32</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-envelope"></i>
              <h3>E-posta Gönderin</h3>
              <p>arasy541@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="row gy-4 mt-1">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.8286903330693!2d29.006945515256247!3d41.0664984792994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab697782d4cfd%3A0xf650d32f1a6b0c2a!2sSun%20Plaza!5e0!3m2!1str!2str!4v1700208000000!5m2!1str!2str"
              style={{ border: 0, width: '100%', height: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="cv-modal-form php-email-form">
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Adınız"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="E-posta Adresiniz"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Konu"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={6}
                    placeholder="Mesajınız"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  {isLoading && <div className="loading">Yükleniyor</div>}
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  {successMessage && <div className="sent-message">{successMessage}</div>}

                  <button type="submit" disabled={isLoading}>Mesaj Gönder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
