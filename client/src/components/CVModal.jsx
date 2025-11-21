import { useState } from 'react';
import axios from 'axios';

function CVModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    section_title: 'Uzmanlıklarımız',
    expertise: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      alert('Lütfen CV dosyanızı seçiniz.');
      return;
    }

    setIsSubmitting(true);
    
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('email', formData.email);
    fd.append('phone', formData.phone);
    fd.append('section_title', formData.section_title);
    fd.append('expertise', formData.expertise);
    fd.append('cvFile', cvFile);

    try {
      const response = await axios.post('/forms/cv-send', fd);
      alert(response.data.message || 'CV başarıyla gönderildi!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        section_title: 'Uzmanlıklarımız',
        expertise: '',
      });
      setCvFile(null);
      e.target.reset();
      onClose();
    } catch (error) {
      console.error('CV gönderme hatası:', error);
      alert('CV gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">CV Gönder</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form id="cvForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Ad Soyad *</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-posta *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Telefon</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="section_title" className="form-label">Uzmanlık Alanı</label>
                <select
                  className="form-select"
                  id="section_title"
                  name="section_title"
                  value={formData.section_title}
                  onChange={handleInputChange}
                >
                  <option value="Uzmanlıklarımız">Genel</option>
                  <option value="İnsan Kaynakları">İnsan Kaynakları</option>
                  <option value="Yönetim">Yönetim</option>
                  <option value="Danışmanlık">Danışmanlık</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="expertise" className="form-label">Deneyim/Not</label>
                <textarea
                  className="form-control"
                  id="expertise"
                  name="expertise"
                  rows="3"
                  value={formData.expertise}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="cvFile" className="form-label">CV Dosyası *</label>
                <input
                  type="file"
                  className="form-control"
                  id="cvFile"
                  name="cvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-submit-cv" disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVModal;
