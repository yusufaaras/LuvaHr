<?php
/**
 * CV GÖNDERME BETİĞİ (forms/cv-send.php)
 *
 * Bu betik, form verilerini ve yüklenen dosyayı (CV) alır,
 * belirtilen e-posta adresine (arasy541@gmail.com) gönderir.
 *
 * NOT: Dosya yükleme ve e-posta gönderme işlemi hassas olduğu için,
 * gerçek projelerde daha gelişmiş ve güvenli kütüphaneler (örneğin PHPMailer)
 * ve daha sıkı güvenlik kontrolleri (dosya boyutu, türü vb.) kullanmanız önerilir.
 */

// Gönderilecek hedef e-posta adresi
$receiving_email_address = 'arasy541@gmail.com';

if (empty($_POST['name']) || empty($_POST['email']) || empty($_FILES['cv_file'])) {
    http_response_code(400); // Bad Request
    echo "Lütfen tüm zorunlu alanları doldurunuz ve CV dosyasını yükleyiniz.";
    exit;
}

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($_POST['phone']) ? filter_var($_POST['phone'], FILTER_SANITIZE_STRING) : 'Belirtilmedi';
$expertise = filter_var($_POST['expertise'], FILTER_SANITIZE_STRING);

// E-posta başlığı
$subject = "Yeni CV Başvurusu: " . $name;
$body = "<h2>Yeni CV Başvurusu</h2>";
$body .= "<p><strong>Ad Soyad:</strong> " . $name . "</p>";
$body .= "<p><strong>E-posta:</strong> " . $email . "</p>";
$body .= "<p><strong>Cep Telefonu:</strong> " . $phone . "</p>";
$body .= "<p><strong>Uzmanlık Alanı:</strong> " . $expertise . "</p>";
$body .= "<p>CV dosyası ektedir.</p>";


// E-posta başlıkları (Headers)
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: LuvaHr CV Formu <no-reply@sitenizin-adi.com>" . "\r\n"; // Kendi alan adınızı kullanın
$headers .= "Reply-To: " . $email . "\r\n";

// DOSYA İŞLEMLERİ
$attachment = null;
if (isset($_FILES['cv_file']) && $_FILES['cv_file']['error'] == 0) {
    $file_tmp = $_FILES['cv_file']['tmp_name'];
    $file_name = $_FILES['cv_file']['name'];
    $file_type = $_FILES['cv_file']['type'];

    // Dosya içeriğini oku
    $data = file_get_contents($file_tmp);
    $data = chunk_split(base64_encode($data));

    // Boundary (sınır) oluştur
    $boundary = md5(time());
    $headers = "From: LuvaHr CV Formu <no-reply@sitenizin-adi.com>" . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"" . "\r\n";

    // E-posta gövdesi (Metin kısmı)
    $attachment .= "--{$boundary}\r\n";
    $attachment .= "Content-Type: text/html; charset=UTF-8\r\n";
    $attachment .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $attachment .= $body . "\r\n";

    // Eklenti kısmı
    $attachment .= "--{$boundary}\r\n";
    $attachment .= "Content-Type: {$file_type}; name=\"{$file_name}\"\r\n";
    $attachment .= "Content-Transfer-Encoding: base64\r\n";
    $attachment .= "Content-Disposition: attachment; filename=\"{$file_name}\"\r\n\r\n";
    $attachment .= $data . "\r\n";
    $attachment .= "--{$boundary}--";

    // E-postayı gönder
    $mail_sent = mail($receiving_email_address, $subject, $attachment, $headers);
} else {
    // Dosya yüklemesi başarısızsa sadece metin olarak gönder (önerilmez)
    $mail_sent = mail($receiving_email_address, $subject, $body, $headers);
}


if ($mail_sent) {
    echo "OK"; // Başarılı mesajı dön
} else {
    http_response_code(500); // Internal Server Error
    echo "Üzgünüz, CV gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
}
?>