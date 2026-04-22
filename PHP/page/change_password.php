<?php
session_start();
require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/user.crud.php";

header('Content-Type: application/json');

// Bloquer accès si l'utilisateur n'es pas connecté
if(!isset($_SESSION["user"])){
    echo json_encode(["error" => "Non connecté"]);
    exit();
}

// Donnee POST
$data = json_decode(file_get_contents("php://input"), true);

// verification des champs obligatoire
if(!isset($data["oldPassword"]) || !isset($data["newPassword"])){
    echo json_encode(["error" => "Données manquantes"]);
    exit();
}

// verifie que l'utilisateur existe
$user = getUserById($conn, $_SESSION["user"]);
if(!$user){
    session_destroy();
    echo json_encode(["error" => "Utilisateur non trouvé"]);
    exit();
}

// verification de l'ancien mdp
$hashOldMdp = hash("sha256", $data["oldPassword"]);
$query = "SELECT `mdp` FROM `utilisateurs` WHERE `id`=" . $_SESSION["user"];
$ret = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($ret);

if($row["mdp"] !== $hashOldMdp){
    echo json_encode(["error" => "Ancien mot de passe incorrect"]);
    exit();
}

// Vérifi mdp correspond
if($data["newPassword"] !== $data["confirmPassword"]){
    echo json_encode(["error" => "Les mots de passe ne correspondent pas"]);
    exit();
}

// Mise a jour du mdp
$newHashMdp = hash("sha256", $data["newPassword"]);
$updateQuery = "UPDATE `utilisateurs` SET `mdp`='$newHashMdp' WHERE `id`=" . $_SESSION["user"];
$updateRet = mysqli_query($conn, $updateQuery);

if(!$updateRet){
    echo json_encode(["error" => "Erreur lors de la mise à jour"]);
    exit();
}

echo json_encode(["success" => "Mot de passe changé avec succès"]);
?>
