import { useState, useEffect, useCallback } from 'react';
import { cvApi } from '../../services/api';

const Admin = () => {
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [filters, setFilters] = useState({
    expertise: '',
    name: '',
    email: '',
  });
  const [editingCv, setEditingCv] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await cvApi.getAll();
      const data = Array.isArray(result) ? result : result.data || [];
      setCvs(data);
    } catch (error) {
      console.error('Error loading CVs:', error);
      alert('Veri yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const applyFilters = useCallback(() => {
    let filtered = [...cvs];

    if (filters.expertise) {
      filtered = filtered.filter((cv) =>
        getExpertiseField(cv).toLowerCase().includes(filters.expertise.toLowerCase())
      );
    }

    if (filters.name) {
      filtered = filtered.filter((cv) => cv.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    if (filters.email) {
      filtered = filtered.filter((cv) => cv.email.toLowerCase().includes(filters.email.toLowerCase()));
    }

    setFilteredCvs(filtered);
  }, [cvs, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const getExpertiseField = (row) => {
    return (
      row.expertise ??
      row.uzmanlik ??
      row['uzmanlık'] ??
      row.section_title ??
      row.sectionTitle ??
      row.title ??
      ''
    );
  };

  const getFilename = (row) => {
    if (row.filename) return row.filename;
    if (row.filepath) {
      const parts = String(row.filepath).split('/');
      return parts[parts.length - 1];
    }
    return '';
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    const token = prompt('Silme işlemi için admin token giriniz:');
    if (!token) return;

    try {
      await cvApi.delete(id);
      alert('CV silindi.');
      loadData();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Silme işlemi başarısız. Token yanlış veya sunucu hatası.');
    }
  };

  const handleEdit = (cv) => {
    setEditingCv(cv);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = prompt('Güncelleme işlemi için admin token giriniz:');
    if (!token) return;

    try {
      const updateData = {
        name: editingCv.name,
        email: editingCv.email,
        phone: editingCv.phone,
        expertise: getExpertiseField(editingCv),
        token,
      };

      await cvApi.update(editingCv.id, updateData);
      alert('CV güncellendi.');
      setEditingCv(null);
      loadData();
    } catch (error) {
      console.error('Update error:', error);
      alert('Güncelleme başarısız. Token yanlış veya sunucu hatası.');
    }
  };

  const handleExportExcel = () => {
    if (filteredCvs.length === 0) {
      alert('Dışa aktarılacak veri yok.');
      return;
    }

    // Create CSV content
    const headers = ['#', 'İsim', 'E-posta', 'Telefon', 'Uzmanlık', 'Dosya', 'Oluşturulma'];
    const rows = filteredCvs.map((cv, idx) => [
      idx + 1,
      cv.name || '',
      cv.email || '',
      cv.phone || '',
      getExpertiseField(cv),
      getFilename(cv),
      cv.created_at || '',
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell}"`).join(',') + '\n';
    });

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'cvs-export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3">Admin - CV Kayıtları</h1>

      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Uzmanlık</label>
          <input
            id="filterExpertise"
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
            id="filterName"
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
            id="filterEmail"
            name="email"
            className="form-control"
            placeholder="E-posta ara"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-1">
          <button id="btnRefresh" className="btn btn-primary w-100" onClick={loadData}>
            Yenile
          </button>
        </div>
        <div className="col-md-2">
          <button id="btnExportExcel" className="btn btn-success w-100" onClick={handleExportExcel}>
            Excel İndir
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered" id="cvsTable">
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
            <tbody id="cvsTableBody">
              {filteredCvs.map((cv, index) => (
                <tr key={cv.id}>
                  <td>{index + 1}</td>
                  <td>{cv.name}</td>
                  <td>{cv.email}</td>
                  <td>{cv.phone}</td>
                  <td>{getExpertiseField(cv)}</td>
                  <td>
                    {cv.filepath ? (
                      <a href={`/${cv.filepath}`} target="_blank" rel="noopener noreferrer">
                        {getFilename(cv)}
                      </a>
                    ) : (
                      getFilename(cv)
                    )}
                  </td>
                  <td>{new Date(cv.created_at).toLocaleString('tr-TR')}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(cv)}>
                      Düzenle
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cv.id)}>
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCvs.length === 0 && !isLoading && (
            <div className="text-center my-4">
              <p className="text-muted">Kayıt bulunamadı.</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingCv && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">CV Düzenle</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingCv(null)}
                    aria-label="Kapat"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-3">
                      <label className="form-label">İsim</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingCv.name}
                        onChange={(e) => setEditingCv({ ...editingCv, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">E-posta</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editingCv.email}
                        onChange={(e) => setEditingCv({ ...editingCv, email: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Telefon</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingCv.phone}
                        onChange={(e) => setEditingCv({ ...editingCv, phone: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Uzmanlık</label>
                      <input
                        type="text"
                        className="form-control"
                        value={getExpertiseField(editingCv)}
                        onChange={(e) =>
                          setEditingCv({ ...editingCv, expertise: e.target.value })
                        }
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Kaydet
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditingCv(null)}
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setEditingCv(null)}></div>
        </>
      )}
    </div>
  );
};

export default Admin;
