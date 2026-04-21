<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION["user"])) {
    echo json_encode(["error" => "Non connecté"]);
    exit();
}

require_once __DIR__ . "/../db/db_connect.php";
require_once __DIR__ . "/../CRUD/co2.crud.php";

$donnee = selectDataByUser($conn, $_SESSION["user"]);
if (!$donnee) {
    echo json_encode([]);
    exit();
}

$result = [];
foreach ($donnee as $ligne) {
    $total = intval($ligne["transport"])
        + intval($ligne["alimentaire"])
        + intval($ligne["logement"])
        + intval($ligne["numerique"]);


    $resultat[] = [
        "date" => $ligne["date_saisie"],
        "total" => $total,
        "transport" => intval($ligne["transport"]),
        "alimentaire" => intval($ligne["alimentaire"]),
        "logement" => intval($ligne["logement"]),
        "numerique" => intval($ligne["numerique"])
    ];
}

echo json_encode($resultat);

?>