import { useState } from 'react';
import { cvApi } from '../../services/api';

const CVUploadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    section_title: '',
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('section_title', formData.section_title);
      data.append('cvFile', file);

      const response = await cvApi.upload(data);

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          section_title: '',
        });
        setFile(null);
        // Reset file input
        document.getElementById('cv_file').value = '';
      } else {
        alert(response.message || 'CV gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('CV upload error:', error);
      alert('Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {/* CV Upload Modal */}
      {isOpen && !showSuccess && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">CV Gönder</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={onClose}
                  aria-label="Kapat"
                ></button>
              </div>

              <div className="modal-body">
                <p className="text-muted">
                  Kariyerinize yeni bir yön vermeye ne dersiniz? Aşağıdan CV'nizi bize iletebilirsiniz.
                </p>

                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label htmlFor="name" className="form-label visually-hidden">
                      Adınız
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Adınız"
                      required
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label visually-hidden">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-posta"
                      required
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="phone" className="form-label visually-hidden">
                      Telefon
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Telefon (opsiyonel)"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="cv_file" className="form-label">
                      CV Dosyası
                    </label>
                    <input
                      type="file"
                      name="cvFile"
                      id="cv_file"
                      accept=".pdf,.doc,.docx"
                      required
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="section_title" className="form-label visually-hidden">
                      Uzmanlıklarınız
                    </label>
                    <input
                      type="text"
                      name="section_title"
                      placeholder="Uzmanlıklarınız (opsiyonel)"
                      className="form-control"
                      value={formData.section_title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-submit-cv" disabled={isSubmitting}>
                      {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <div className="mb-2">
                  <i className="bi bi-check-circle-fill" style={{ fontSize: '2.2rem', color: 'var(--luva-primary)' }}></i>
                </div>
                <h5 className="mb-2">CV başarıyla gönderildi</h5>
                <p className="text-muted mb-3">CV'niz başarılı bir şekilde gönderilmiştir.</p>
                <button onClick={handleSuccessOk} className="btn btn-ok" type="button">
                  Tamam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {(isOpen || showSuccess) && (
        <div className="modal-backdrop fade show" onClick={isOpen ? onClose : handleSuccessOk}></div>
      )}
    </>
  );
};

export default CVUploadModal;
