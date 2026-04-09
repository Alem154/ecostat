<?php
$path = __DIR__."/../../.env";

//echo "Chemin cherché : " . realpath($path) . "<br>";
//echo "Fichier existe : " . (file_exists($path) ? " OUI" : " NON") . "<br>";

$_ENV = parse_ini_file($path);
?>