<?php
session_start();

require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/user.crud.php";

header('Content-Type: application/json');

$response = [
    "connected" => false,
    "pseudo" => null,
    "id" => null
];

if(isset($_SESSION["user"])){
    $user = getUserById($conn, $_SESSION["user"]);
    if($user){
        $response["connected"] = true;
        $response["pseudo"] = $user["pseudo"];
        $response["id"] = $user["id"];
    }
}

echo json_encode($response);
?>
