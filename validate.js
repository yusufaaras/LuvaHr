const form = document.getElementById('cvForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const res = await fetch('/forms/cv-send', {
    method: 'POST',
    body: fd
  });
  const json = await res.json();
  alert(json.message);
});