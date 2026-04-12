<?php
session_start();
header('Content-Type: application/json');

// Vérifier si connecte
if(!isset($_SESSION["user"])){
    echo json_encode(["error" => "Non connecté"]);
    exit();
}

require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/user.crud.php";

// Récupere les infos
$user = getUserById($conn, $_SESSION["user"]);

if(!$user){
    session_destroy();
    echo json_encode(["error" => "Utilisateur non trouvé"]);
    exit();
}

echo json_encode([
    "pseudo" => $user["pseudo"],
    "email" => $user["email"],
    "id" => $user["id"]
]);
?>
