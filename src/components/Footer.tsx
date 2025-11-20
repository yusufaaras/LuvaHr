import { useState, FormEvent } from 'react'

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const formData = new FormData()
      formData.append('email', newsletterEmail)

      const response = await fetch('/public/forms/newsletter.php', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSuccessMessage('Abonelik talebiniz gönderildi. Teşekkürler!')
        setNewsletterEmail('')
      } else {
        setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="sitename">LuvaHr</span>
            </a>
            <div className="footer-contact pt-3">
              <p>Maslak Mah. Bilim Sok. Sun Plaza Kat:13 No:5/A</p>
              <p>SARIYER / İSTANBUL</p>
              <p className="mt-3"><strong>Telefon:</strong> <span>0212 366 57 32</span></p>
              <p><strong>E-posta:</strong> <span>arasy541@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Faydalı Bağlantılar</h4>
            <ul>
              <li><a href="#">Anasayfa</a></li>
              <li><a href="#">Hakkımızda</a></li>
              <li><a href="#">Kullanım Şartları</a></li>
              <li><a href="#">Gizlilik Politikası</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Diğer Bağlantılar</h4>
            <ul>
              <li><a href="#">Uzman Personel İşe Alımı</a></li>
              <li><a href="#">Üst Düzey Yönetici İşe Alımı</a></li>
              <li><a href="#">Kurumsal İK Danışmanlığı</a></li>
              <li><a href="#">Yetenek Havuzu Yönetimi</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>E-Bültenimize Abone Olun</h4>
            <p>E-bültenimize abone olarak ürünlerimiz ve hizmetlerimiz hakkındaki en son haberleri alın!</p>
            <form onSubmit={handleNewsletterSubmit} className="php-email-form">
              <div className="newsletter-form">
                <input 
                  type="email" 
                  name="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <input type="submit" value="Abone Ol" disabled={isLoading} />
              </div>
              {isLoading && <div className="loading">Yükleniyor</div>}
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="sent-message">{successMessage}</div>}
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Telif Hakkı</span> <strong className="px-1 sitename">LuvaHr</strong>
          <span>Tüm Hakları Saklıdır</span>
        </p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Dist
          <a href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
