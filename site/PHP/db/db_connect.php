<?php
$servername = "mysql-ecostat.alwaysdata.net";
$username = "ecostat";
$password = "ProjetEcoStat3!";
$database = "ecostat_bd";

$connexion_db = mysqli_connect($servername,$username,$password,$database);  
mysqli_set_charset($connexion_db, "utf8");

if ($connexion_db -> connect_error){    
    die("Erreur de connexion : ".$connexion_db ->connect_error);

}
echo "Connexion réussie";

?>