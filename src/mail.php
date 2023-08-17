<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';

$uploads_dir = 'uploads';

// Переменные, которые отправляет пользователь
$name = isset($_POST["name"]) ? $_POST["name"] : "";
$email = isset($_POST["email"]) ? $_POST["email"] : "";
$typeProject = isset($_POST["typeProject"]) ? $_POST["typeProject"] : "";
$deadline = isset($_POST["date"]) ? $_POST["date"] : "";
$aerial = isset($_POST["aerial"]) ? $_POST["aerial"] : "";
$exterior = isset($_POST["exterior"]) ? $_POST["exterior"] : "";
$interior = isset($_POST["interior"]) ? $_POST["interior"] : "";
$price = isset($_POST["price"]) ? $_POST["price"] : "";
$images = isset($_POST['images']) ? json_decode($_POST['images']) : array();
$message = isset($_POST["comments"]) ? $_POST["comments"] : "";


// Формирование самого письма
$title = "Contact";
$body = "\n\n Name: $name  \n\n Email: $email \n\n Project Type: $typeProject \n\n Deadline: $deadline \n\n Aerial: $aerial \n\n Exterior: $exterior \n\n Interior: $interior \n\n Total Price: $price \n\n Message: $message \n\n";

$token = "6094347566:AAE-A6km2c3C7DT82OycLQ3C7FeRwW1bQnQ";
$channelid = "-1001988092368";

$TelegramChannel = fopen( "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$channelid}&parse_mode=html&text={$body}", "r" );







// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->CharSet = "UTF-8";
try {
    $mail->From = $email;
    $mail->FromName = $name;
    // Получатель письма
    // $mail->addAddress('info@jazzrender.com'); 
    $mail->addAddress('info@jazzrender.com'); 

// Прикрипление файлов к письму
    foreach ($images as $img) {
    $target = $uploads_dir.DIRECTORY_SEPARATOR.$img;
	$mail->AddAttachment( $target );
}

// Отправка сообщения
$mail->isHTML(false);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {
$result = "success";

//Deletes images from dir
foreach ($images as $img) {
    $target = $uploads_dir.DIRECTORY_SEPARATOR.$img;
	unlink($target);
}

} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "The message was not sent. The reason for the error: {$mail->ErrorInfo}";
}

$mail->ClearAddresses();
$mail->clearAttachments();

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);