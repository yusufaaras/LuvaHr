// Basit admin token kullanımı: güncelleme/silme için token isteniyor.
// Güvenlik notu: Prod ortamında gerçek kimlik doğrulama/oturum sistemi kullanın.
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#cvsTable tbody');
    const filterName = document.getElementById('filterName');
    const filterEmail = document.getElementById('filterEmail');
    const filterExpertise = document.getElementById('filterExpertise');
    const btnRefresh = document.getElementById('btnRefresh');
  
    let cvs = [];
  
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const editForm = document.getElementById('editForm');
    const editId = document.getElementById('editId');
    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    const editExpertise = document.getElementById('editExpertise');
  
    function loadData() {
      fetch('/api/cvs')
        .then(r => r.json())
        .then(result => {
          if (!result.ok) throw new Error('API hata');
          cvs = result.data || [];
          renderTable();
        })
        .catch(err => {
          console.error(err);
          alert('Veri alınırken hata oluştu. Konsolu kontrol edin.');
        });
    }
  
    function renderTable() {
      const nameQ = filterName.value.trim().toLowerCase();
      const emailQ = filterEmail.value.trim().toLowerCase();
      const expQ = filterExpertise.value.trim().toLowerCase();
  
      const filtered = cvs.filter(row => {
        const nameOk = !nameQ || (row.name || '').toLowerCase().includes(nameQ);
        const emailOk = !emailQ || (row.email || '').toLowerCase().includes(emailQ);
        const expOk = !expQ || ((row.expertise || '') + '').toLowerCase().includes(expQ);
        return nameOk && emailOk && expOk;
      });
  
      tableBody.innerHTML = '';
      filtered.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${escapeHtml(row.name || '')}</td>
          <td>${escapeHtml(row.email || '')}</td>
          <td>${escapeHtml(row.phone || '')}</td>
          <td>${escapeHtml(row.expertise || '')}</td>
          <td>${row.filename ? `<a href="/uploads/${encodeURIComponent(row.filename)}" target="_blank">${escapeHtml(row.filename)}</a>` : ''}</td>
          <td>${escapeHtml(row.created_at || '')}</td>
          <td>
            <button class="btn btn-sm btn-secondary btn-edit" data-id="${row.id}">Güncelle</button>
            <button class="btn btn-sm btn-danger btn-delete ms-1" data-id="${row.id}">Sil</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
  
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.currentTarget.dataset.id;
          const row = cvs.find(r => r.id == id);
          if (!row) return alert('Kayıt bulunamadı');
          editId.value = row.id;
          editName.value = row.name || '';
          editEmail.value = row.email || '';
          editPhone.value = row.phone || '';
          editExpertise.value = row.expertise || '';
          editModal.show();
        });
      });
  
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.currentTarget.dataset.id;
          if (!confirm('Kayıtı silmek istediğinize emin misiniz?')) return;
          const token = prompt('Admin token (silme için):');
          if (!token) return alert('Token gerekli');
          fetch(`/api/cvs/${id}`, {
            method: 'DELETE',
            headers: { 'x-admin-token': token }
          })
          .then(r => r.json())
          .then(res => {
            if (!res.ok) throw new Error(res.message || 'Sunucu hatası');
            alert('Kayıt silindi');
            loadData();
          })
          .catch(err => {
            console.error(err);
            alert('Silme başarısız: ' + (err.message || err));
          });
        });
      });
    }
  
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editId.value;
      const payload = {
        name: editName.value.trim(),
        email: editEmail.value.trim(),
        phone: editPhone.value.trim(),
        expertise: editExpertise.value.trim()
      };
      const token = prompt('Admin token (güncelleme için):');
      if (!token) return alert('Token gerekli');
      fetch(`/api/cvs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(payload)
      })
      .then(r => r.json())
      .then(res => {
        if (!res.ok) throw new Error(res.message || 'Sunucu hatası');
        alert('Güncelleme başarılı');
        editModal.hide();
        loadData();
      })
      .catch(err => {
        console.error(err);
        alert('Güncelleme başarısız: ' + (err.message || err));
      });
    });
  
    // helpers
    function escapeHtml(s) {
      return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
  
    filterName.addEventListener('input', renderTable);
    filterEmail.addEventListener('input', renderTable);
    filterExpertise.addEventListener('input', renderTable);
    btnRefresh.addEventListener('click', loadData);
  
    loadData();
  });