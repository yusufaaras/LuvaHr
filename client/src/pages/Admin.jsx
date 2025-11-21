import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    expertise: ''
  });
  const [editingCV, setEditingCV] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterData();
  }, [cvs, filters]);

  const loadData = async () => {
    try {
      const response = await axios.get('/api/cvs');
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setCvs(data);
    } catch (error) {
      console.error('Veri alınırken hata:', error);
      alert('Veri alınırken hata oluştu. Konsolu kontrol edin.');
    }
  };

  const filterData = () => {
    const filtered = cvs.filter(cv => {
      const nameMatch = !filters.name || (cv.name || '').toLowerCase().includes(filters.name.toLowerCase());
      const emailMatch = !filters.email || (cv.email || '').toLowerCase().includes(filters.email.toLowerCase());
      const expertiseMatch = !filters.expertise || 
        (cv.expertise || cv.section_title || '').toLowerCase().includes(filters.expertise.toLowerCase());
      
      return nameMatch && emailMatch && expertiseMatch;
    });
    setFilteredCvs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (cv) => {
    setEditingCV({
      id: cv.id,
      name: cv.name || '',
      email: cv.email || '',
      phone: cv.phone || '',
      expertise: cv.expertise || cv.section_title || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Kayıtı silmek istediğinize emin misiniz?')) return;
    
    const token = window.prompt('Admin token (silme için):');
    if (!token) {
      alert('Token gerekli');
      return;
    }

    try {
      await axios.delete(`/api/cvs/${id}`, {
        headers: { 'x-admin-token': token }
      });
      alert('Kayıt silindi');
      loadData();
    } catch (error) {
      console.error('Silme hatası:', error);
      alert('Silme başarısız: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    const token = window.prompt('Admin token (güncelleme için):');
    if (!token) {
      alert('Token gerekli');
      return;
    }

    try {
      await axios.put(`/api/cvs/${editingCV.id}`, {
        name: editingCV.name,
        email: editingCV.email,
        phone: editingCV.phone,
        expertise: editingCV.expertise
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        }
      });
      alert('Güncelleme başarılı');
      setShowEditModal(false);
      setEditingCV(null);
      loadData();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Güncelleme başarısız: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleExportExcel = () => {
    if (!window.XLSX) {
      alert('Excel export kütüphanesi yüklenmedi. Lütfen sayfayı yenileyin.');
      return;
    }

    if (filteredCvs.length === 0) {
      if (!window.confirm('Seçili filtreye uyan kayıt yok. Yine de boş bir dosya indirmek ister misiniz?')) return;
    }

    const header = ['ID', 'İsim', 'E-posta', 'Telefon', 'Uzmanlık', 'Dosya', 'Oluşturulma'];
    const rows = filteredCvs.map(cv => [
      cv.id || '',
      cv.name || '',
      cv.email || '',
      cv.phone || '',
      cv.expertise || cv.section_title || '',
      cv.filename || '',
      cv.created_at || cv.createdAt || ''
    ]);

    const aoa = [header, ...rows];
    const ws = window.XLSX.utils.aoa_to_sheet(aoa);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'CVs');

    const now = new Date();
    const ts = now.toISOString().replace(/[:.]/g, '-');
    const filename = `cvs_export_${ts}.xlsx`;

    window.XLSX.writeFile(wb, filename);
  };

  return (
    <div className="admin-page">
      <div className="container my-4">
        <h1 className="mb-3">Admin - CV Kayıtları</h1>

        <div className="row g-2 align-items-end mb-3">
          <div className="col-md-3">
            <label className="form-label">Uzmanlık</label>
            <input 
              name="expertise"
              className="form-control" 
              placeholder="Uzmanlık ile filtrele"
              value={filters.expertise}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">İsim / Soyisim</label>
            <input 
              name="name"
              className="form-control" 
              placeholder="İsim veya soyisim ara"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">E-posta</label>
            <input 
              name="email"
              className="form-control" 
              placeholder="E-posta ara"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-1">
            <button onClick={loadData} className="btn btn-primary w-100">Yenile</button>
          </div>
          <div className="col-md-2">
            <button onClick={handleExportExcel} className="btn btn-success w-100">Excel İndir</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>İsim</th>
                <th>E-posta</th>
                <th>Telefon</th>
                <th>Uzmanlık</th>
                <th>Dosya</th>
                <th>Oluşturulma</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredCvs.map((cv) => (
                <tr key={cv.id}>
                  <td>{cv.id}</td>
                  <td>{cv.name}</td>
                  <td>{cv.email}</td>
                  <td>{cv.phone}</td>
                  <td>{cv.expertise || cv.section_title}</td>
                  <td>
                    {cv.filename && (
                      <a href={`/download/${cv.id}`} download={cv.filename}>
                        {cv.filename}
                      </a>
                    )}
                  </td>
                  <td>{cv.created_at || cv.createdAt}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEdit(cv)}
                    >
                      Güncelle
                    </button>
                    <button 
                      className="btn btn-sm btn-danger ms-1"
                      onClick={() => handleDelete(cv.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingCV && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">CV Düzenle</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label className="form-label">İsim</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCV.name}
                      onChange={(e) => setEditingCV({...editingCV, name: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">E-posta</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editingCV.email}
                      onChange={(e) => setEditingCV({...editingCV, email: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefon</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCV.phone}
                      onChange={(e) => setEditingCV({...editingCV, phone: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Uzmanlık</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCV.expertise}
                      onChange={(e) => setEditingCV({...editingCV, expertise: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Kaydet</button>
                  <button 
                    type="button" 
                    className="btn btn-secondary ms-2"
                    onClick={() => setShowEditModal(false)}
                  >
                    İptal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
