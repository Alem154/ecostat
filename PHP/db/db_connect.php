<?php

require_once __DIR__."/env.php";

$host = $_ENV["DB_HOST"];
$username = $_ENV["DB_USER"];
$password = $_ENV["DB_PASSWORD"];
$db = $_ENV["DATABASE"];

$conn = mysqli_connect($host,$username,$password, $db);
if (!$conn) {
    //echo "PRBLM";
    die("Connection failed: " . mysqli_connect_error());
}else{
    //echo "tout est bon";
}

mysqli_set_charset($conn,"utf8");
?>