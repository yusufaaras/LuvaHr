// admin.js - güncellenmiş
// Basit admin token kullanımı: güncelleme/silme için token isteniyor.
// Güvenlik notu: Prod ortamında gerçek kimlik doğrulama/oturum sistemi kullanın.
document.addEventListener('DOMContentLoaded', () => {
  // elemanlar
  const tableBody = document.getElementById('cvsTableBody'); // artık ID ile sabitlenmiş
  const filterName = document.getElementById('filterName');
  const filterEmail = document.getElementById('filterEmail');
  const filterExpertise = document.getElementById('filterExpertise');
  const btnRefresh = document.getElementById('btnRefresh');
  const btnExportExcel = document.getElementById('btnExportExcel');

  let cvs = [];
  let currentFiltered = []; // renderTable tarafından güncellenecek, export için kullanılacak

  const editModal = new bootstrap.Modal(document.getElementById('editModal'));
  const editForm = document.getElementById('editForm');
  const editId = document.getElementById('editId');
  const editName = document.getElementById('editName');
  const editEmail = document.getElementById('editEmail');
  const editPhone = document.getElementById('editPhone');
  const editExpertise = document.getElementById('editExpertise');

  // helper: güvenli HTML escape
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // helper: veri satırından uzmanlık alanını al (farklı adlandırmalara toleranslı)
  function getExpertiseField(row) {
    // backend farklı isim kullanıyor olabilir; bunların hepsini kontrol et
    return row.expertise ?? row.uzmanlik ?? row['uzmanlık'] ?? row.section_title ?? row.sectionTitle ?? row.title ?? '';
  }

  // helper: dosya adına karar ver
  function getFilename(row) {
    if (row.filename) return row.filename;
    if (row.filepath) {
      // filepath "uploads/xxx.pdf" gibi ise son segmenti al
      const parts = String(row.filepath).split('/');
      return parts[parts.length - 1];
    }
    return '';
  }

  function loadData() {
    fetch('/api/cvs')
      .then(r => r.json())
      .then(result => {
        // beklenen format: { ok: true, data: [...] } veya doğrudan dizi olabilir
        if (result && typeof result === 'object' && result.ok === false) {
          throw new Error(result.message || 'API returned ok:false');
        }
        cvs = Array.isArray(result) ? result : (result.data || []);
        console.log('Loaded cvs:', cvs);
        renderTable();
      })
      .catch(err => {
        console.error('loadData error', err);
        alert('Veri alınırken hata oluştu. Konsolu kontrol edin.');
      });
  }

  function renderTable() {
    const nameQ = filterName.value.trim().toLowerCase();
    const emailQ = filterEmail.value.trim().toLowerCase();
    const expQ = filterExpertise.value.trim().toLowerCase();

    const filtered = cvs.filter(row => {
      const nameOk = !nameQ || ((row.name || '') + '').toLowerCase().includes(nameQ);
      const emailOk = !emailQ || ((row.email || '') + '').toLowerCase().includes(emailQ);
      const expOk = !expQ || ((getExpertiseField(row) + '').toLowerCase().includes(expQ));
      return nameOk && emailOk && expOk;
    });

    currentFiltered = filtered.slice(); // export için sakla

    tableBody.innerHTML = '';
    filtered.forEach(row => {
      const expertise = escapeHtml(getExpertiseField(row));
      const fname = getFilename(row);
      // Değişiklik: indirme linki artık kayıt id'si üzerinden gidiyor -> server DB'den gerçek filepath'i çözecek
      const filenameCell = fname ? `<a href="/download/${encodeURIComponent(row.id)}" download="${escapeHtml(fname)}">${escapeHtml(fname)}</a>` : '';
      const created = escapeHtml(row.created_at || row.createdAt || '');

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(row.id ?? '')}</td>
        <td>${escapeHtml(row.name || '')}</td>
        <td>${escapeHtml(row.email || '')}</td>
        <td>${escapeHtml(row.phone || '')}</td>
        <td>${expertise}</td>
        <td>${filenameCell}</td>
        <td>${created}</td>
        <td>
          <button class="btn btn-sm btn-secondary btn-edit" data-id="${escapeHtml(row.id ?? '')}">Güncelle</button>
          <button class="btn btn-sm btn-danger btn-delete ms-1" data-id="${escapeHtml(row.id ?? '')}">Sil</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Excel export (SheetJS)
  function exportToExcel() {
    if (!Array.isArray(currentFiltered) || currentFiltered.length === 0) {
      if (!confirm('Seçili filtreye uyan kayıt yok. Yine de boş bir dosya indirmek ister misiniz?')) return;
    }

    // Başlıklar
    const header = ['ID', 'İsim', 'E-posta', 'Telefon', 'Uzmanlık', 'Dosya', 'Oluşturulma'];
    // Satırlar
    const rows = currentFiltered.map(r => [
      r.id ?? '',
      r.name ?? '',
      r.email ?? '',
      r.phone ?? '',
      getExpertiseField(r) ?? '',
      getFilename(r) ?? '',
      r.created_at || r.createdAt || ''
    ]);

    const aoa = [header, ...rows];

    // Sheet oluştur
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CVs');

    // Dosya adı: tarih ile
    const now = new Date();
    const ts = now.toISOString().replace(/[:.]/g, '-');
    const filename = `cvs_export_${ts}.xlsx`;

    // Tarayıcıda dosyayı indir
    XLSX.writeFile(wb, filename);
  }

  // event delegation: tek listener ile edit/delete yönetimi
  tableBody.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit');
    const delBtn = e.target.closest('.btn-delete');

    if (editBtn) {
      const id = editBtn.dataset.id;
      const row = cvs.find(r => String(r.id) === String(id));
      if (!row) return alert('Kayıt bulunamadı');
      editId.value = row.id ?? '';
      editName.value = row.name ?? '';
      editEmail.value = row.email ?? '';
      editPhone.value = row.phone ?? '';
      editExpertise.value = getExpertiseField(row) ?? '';
      editModal.show();
    } else if (delBtn) {
      const id = delBtn.dataset.id;
      if (!confirm('Kayıtı silmek istediğinize emin misiniz?')) return;
      const token = prompt('Admin token (silme için):');
      if (!token) return alert('Token gerekli');
      fetch(`/api/cvs/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': token }
      })
      .then(r => r.json())
      .then(res => {
        if (res && res.ok === false) throw new Error(res.message || 'Sunucu hatası');
        // bazı API'ler {ok:true} döndürmeyebilir; kontrol et
        alert('Kayıt silindi');
        loadData();
      })
      .catch(err => {
        console.error('delete error', err);
        alert('Silme başarısız: ' + (err.message || err));
      });
    }
  });

  // edit form submit
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
    fetch(`/api/cvs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token
      },
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(res => {
      if (res && res.ok === false) throw new Error(res.message || 'Sunucu hatası');
      alert('Güncelleme başarılı');
      editModal.hide();
      loadData();
    })
    .catch(err => {
      console.error('update error', err);
      alert('Güncelleme başarısız: ' + (err.message || err));
    });
  });

  // filtre eventleri
  filterName.addEventListener('input', renderTable);
  filterEmail.addEventListener('input', renderTable);
  filterExpertise.addEventListener('input', renderTable);
  btnRefresh.addEventListener('click', loadData);
  btnExportExcel.addEventListener('click', exportToExcel);

  loadData();
});