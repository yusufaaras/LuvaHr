const express = require('express');
const path = require('path');
const app = express();

// body parser (form verileri için)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statik dosyaları sun (index.html proje kökünde ise)
app.use('/', express.static(path.join(__dirname)));

// cv route'u dahil et
const cvUpload = require('./cv-upload');
app.use(cvUpload);

// başlat
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server çalışıyor: http://localhost:${port}`));