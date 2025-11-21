const form = document.getElementById('cvForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  try {
    const res = await fetch('/forms/cv-send', {
      method: 'POST',
      body: fd
    });
    const json = await res.json();
    // Kullanıcıya "Gönderilmiştir" mesajı göster, OK'a basınca ana sayfaya yönlendir
    alert(json.message);
    if (json.ok) {
      window.location.href = '/';
    }
  } catch (err) {
    console.error('İstek hatası:', err);
    alert('Sunucuya bağlanırken bir hata oluştu. Lütfen tekrar deneyin.');
  }
});