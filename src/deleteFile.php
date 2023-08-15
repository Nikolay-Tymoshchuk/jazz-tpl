<?php

$uploads_dir = 'uploads';
$fName = $_POST['file'];
$target = $uploads_dir.DIRECTORY_SEPARATOR.$fName;

unlink($target);

header('Content-type: application/json');
echo json_encode([
'fileName' => $fName
]);

?>
