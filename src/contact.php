<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST["name"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$partner = $_POST["partner"];
$message = $_POST["comments"];

// telegram bot
	$token = "6094347566:AAE-A6km2c3C7DT82OycLQ3C7FeRwW1bQnQ";
	$channelid = "-955632968";


// Формирование самого письма
$title = "Contact";
$body = "\n\n Name: $name  \n\n Phone: $phone \n\n Email: $email \n\n Partner: $partner \n\n Message: $message \n\n";

	// telegram bot
	$TelegramChannel = fopen( "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$channelid}&parse_mode=html&text={$body}", "r" );



// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = "UTF-8";
try {
    $mail->From = $email;
    $mail->FromName = $name;
    // Получатель письма
    $mail->addAddress('info@jazzrender.com');  


// Отправка сообщения
$mail->isHTML(false);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "The message was not sent. The reason for the error: {$mail->ErrorInfo}";
}

$mail->ClearAddresses();


// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);