import { useState, FormEvent, useEffect } from 'react'
import { CVFormData } from '../types'

interface CVModalProps {
  show: boolean;
  onClose: () => void;
}

function CVModal({ show, onClose }: CVModalProps) {
  const [formData, setFormData] = useState<CVFormData>({
    name: '',
    email: '',
    phone: '',
    expertise: ''
  })
  const [fileName, setFileName] = useState('Dosya seçilmedi')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (show) {
      // Use Bootstrap's modal API
      const modalElement = document.getElementById('cvModal')
      if (modalElement && window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElement)
        modal.show()
      }
    } else {
      const modalElement = document.getElementById('cvModal')
      if (modalElement && window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        }
      }
    }
  }, [show])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFormData({ ...formData, cv_file: file })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('expertise', formData.expertise)
      if (formData.cv_file) {
        formDataToSend.append('cv_file', formData.cv_file)
      }
      formDataToSend.append('to_email', 'arasy541@gmail.com')
      formDataToSend.append('subject', `Yeni CV Başvurusu: ${formData.name}`)

      const response = await fetch('/forms/cv-send.php', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setSuccessMessage("CV'niz başarıyla gönderildi. Teşekkür ederiz!")
        setFormData({ name: '', email: '', phone: '', expertise: '' })
        setFileName('Dosya seçilmedi')
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setErrorMessage('CV gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      setErrorMessage('CV gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal fade" id="cvModal" tabIndex={-1} aria-labelledby="cvModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0 d-block text-center cv-modal-header">
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Kapat"
              onClick={onClose}
            ></button>
            <h2 className="modal-title" id="cvModalLabel">CV Gönder</h2>
            <p>Kariyerinize yeni bir yön vermeye ne dersiniz?</p>
          </div>

          <div className="modal-body pt-3">
            <form onSubmit={handleSubmit} className="cv-modal-form php-email-form">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="name">Ad Soyad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Boran Demir"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email">E-posta</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="me@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phone">Cep Telefonu</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="05xx xxx xx xx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="expertise">Uzmanlığınız</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expertise"
                    name="expertise"
                    placeholder="Satış Yöneticisi / Yazılımcı / Muhasebe Uzmanı"
                    required
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  />
                </div>

                <div className="col-md-12 mb-4">
                  <label htmlFor="cv_file_upload">CV Yükleyin</label>
                  <div className="custom-file-upload">
                    <label htmlFor="cv_file_upload" className="custom-file-input-label">Dosya Seç</label>
                    <input
                      type="file"
                      id="cv_file_upload"
                      name="cv_file"
                      required
                      onChange={handleFileChange}
                    />
                    <div id="file-name" className="file-name-display">{fileName}</div>
                  </div>
                </div>

                <div className="col-md-12">
                  {isLoading && <div className="loading">Yükleniyor</div>}
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  {successMessage && <div className="sent-message">{successMessage}</div>}
                  <button type="submit" className="btn-gonder" disabled={isLoading}>Gönder</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .cv-modal-content {
          background-color: #383838;
          color: white;
          padding: 40px;
          border-radius: 10px;
        }

        .cv-modal-header h2 {
          color: white;
          font-weight: 700;
        }

        .cv-modal-header p {
          color: #9ac836;
        }

        .cv-modal-form .form-control {
          background-color: white;
          color: #383838;
          border: 1px solid #ced4da;
        }

        .cv-modal-form .form-group {
          margin-bottom: 20px;
        }

        .cv-modal-form label {
          color: #d1d1d1;
          margin-bottom: 5px;
          display: block;
        }

        .cv-modal-form .btn-gonder {
          background-color: #9ac836;
          color: white;
          border: none;
          padding: 10px 30px;
          font-weight: 600;
          transition: background-color 0.3s;
          width: 100%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cv-modal-form .btn-gonder:hover {
          background-color: #83b02b;
        }

        .cv-modal-form .custom-file-upload {
          display: flex;
        }

        .cv-modal-form .custom-file-input-label {
          background-color: #8a2be2;
          color: white;
          padding: 8px 15px;
          border-radius: 4px 0 0 4px;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
        }

        .cv-modal-form .custom-file-input-label:hover {
          background-color: #6a1ac4;
        }

        .cv-modal-form .file-name-display {
          flex-grow: 1;
          background-color: white;
          color: #383838;
          padding: 8px 12px;
          border-radius: 0 4px 4px 0;
          border: 1px solid #ced4da;
          border-left: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cv-modal-form input[type="file"] {
          display: none;
        }

        #cvModal .modal-dialog {
          max-width: 600px;
          margin: 1.75rem auto;
        }

        #cvModal .modal-content {
          background-color: #383838;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default CVModal
