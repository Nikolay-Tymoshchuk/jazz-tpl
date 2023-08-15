<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';

$uploads_dir = 'uploads';

// Переменные, которые отправляет пользователь
$name = $_POST["name"]; 
$email = $_POST["email"];
$typeProject = $_POST["typeProject"];
$deadline = $_POST["date"];
$aerial = $_POST["aerial"];
$exterior = $_POST["exterior"];
$interior = $_POST["interior"];
$price = $_POST["price"];
$images = json_decode($_POST['images']);

$message = $_POST["comments"];


// Формирование самого письма
$title = "Contact";
$body = "\n\n Name: $name  \n\n Email: $email \n\n Project Type: $typeProject \n\n Deadline: $deadline \n\n Aerial: $aerial \n\n Exterior: $exterior \n\n Interior: $interior \n\n Total Price: $price \n\n Message: $message \n\n";



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