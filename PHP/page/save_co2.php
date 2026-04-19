<?php
session_start();

require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/co2.crud.php";

header('Content-Type: application/json');

if(!isset($_SESSION["user"])){
    echo json_encode(["success" => false, "error" => "Non connecté"]);
    exit;
}

$id_user = intval($_POST["id_user"] ?? 0);
$transport = intval($_POST["transport"] ?? 0);
$alimentaire = intval($_POST["alimentaire"] ?? 0);
$logement = intval($_POST["logement"] ?? 0);
$numerique = intval($_POST["numerique"] ??0);

if($id_user <= 0){
    echo json_encode(["success" => false, "error" => "Utilisateur invalide"]);
    exit;
}

if($_SESSION["user"] != $id_user){
    echo json_encode(["success" => false, "error" => "Accès refusé"]);
    exit;
}

$result = createData($conn, $id_user, $transport, $alimentaire, $logement, $numerique);

if($result === true || $result){
    echo json_encode(["success" => true]);
} else{
    echo json_encode(["success" => false, "error" => $result]);
}
?>