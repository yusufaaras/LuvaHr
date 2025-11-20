import { useState, useEffect } from 'react';

function CVModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    cv_file: null
  });
  const [fileName, setFileName] = useState('Dosya seçilmedi');
  const [formStatus, setFormStatus] = useState({ loading: false, error: '', success: false });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        cv_file: file
      });
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', success: false });

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('expertise', formData.expertise);
    formDataToSend.append('cv_file', formData.cv_file);
    formDataToSend.append('to_email', 'arasy541@gmail.com');
    formDataToSend.append('subject', `Yeni CV Başvurusu: ${formData.name}`);

    try {
      const response = await fetch('/forms/cv-send.php', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setFormStatus({ loading: false, error: '', success: true });
        setFormData({ name: '', email: '', phone: '', expertise: '', cv_file: null });
        setFileName('Dosya seçilmedi');
        setTimeout(() => {
          onClose();
          setFormStatus({ loading: false, error: '', success: false });
        }, 2000);
      } else {
        setFormStatus({ loading: false, error: 'CV gönderilirken bir hata oluştu.', success: false });
      }
    } catch (error) {
      setFormStatus({ loading: false, error: 'CV gönderilirken bir hata oluştu.', success: false });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show" id="cvModal" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0 d-block text-center cv-modal-header">
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
              <h2 className="modal-title">CV Gönder</h2>
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
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                      onChange={handleChange}
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
                      value={formData.expertise}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label htmlFor="cv_file_upload">CV Yükleyin</label>
                    <div className="custom-file-upload">
                      <label htmlFor="cv_file_upload" className="custom-file-input-label">
                        Dosya Seç
                      </label>
                      <input
                        type="file"
                        id="cv_file_upload"
                        name="cv_file"
                        onChange={handleFileChange}
                        required
                      />
                      <div className="file-name-display">{fileName}</div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {formStatus.loading && <div className="loading">Yükleniyor</div>}
                    {formStatus.error && <div className="error-message">{formStatus.error}</div>}
                    {formStatus.success && <div className="sent-message">CV'niz başarıyla gönderildi. Teşekkür ederiz!</div>}
                    <button type="submit" className="btn-gonder">
                      Gönder
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVModal;
