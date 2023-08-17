<?php

$allowedExtensions = array('gif', 'jpeg', 'jpg', 'png');
$uploads_dir = 'uploads';
$tmp_name = $_FILES["file"]["tmp_name"];
$name = $_FILES["file"]["name"];
$path_part = pathinfo($name);
$ext = $path_part['extension']; 
$fName = uniqid(). '.' .$ext;
$target = $uploads_dir.DIRECTORY_SEPARATOR.$fName;

// Clean junk files
if (file_exists($uploads_dir)) {
    foreach (new DirectoryIterator($uploads_dir) as $fileInfo) {
        if ($fileInfo->isDot()) {
        continue;
        }
        if ($fileInfo->isFile() && time() - $fileInfo->getCTime() >= 60*60) {
            unlink($fileInfo->getRealPath());
        }
    }
}

if (!in_array($ext, $allowedExtensions)) {
    $error = "Extension is not allowed!!! Try Again.";
    echo json_encode([
    'fileName' => $fName,
    'error' => $error
    ]);
}else{
    move_uploaded_file($tmp_name, $target);
    echo json_encode([
    'fileName' => $fName
    ]);
}

?>