<?php
session_start();

require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/user.crud.php";

// def le type de contenu de la rep JSON
header('Content-Type: application/json');

// reponse pas défaut
$response = [
    "connected" => false,
    "pseudo" => null,
    "id" => null
];

// remplie la variable avec les données de l'utilisateur
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
