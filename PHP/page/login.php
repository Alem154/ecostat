<?php
session_start();

require_once __DIR__."../db/db_connect.php";
require_once __DIR__."../CRUD/user.crud.php";

//Connexion
if(isset($_POST["usernameLogin"]) && isset($_POST["passwordLogin"])){
    $t = connect($conn, $_POST["usernameLogin"], $_POST["passwordLogin"]);
    if($t["correct"]){
        $_SESSION["user"] = $t["id"];
        header("location: ../../html/profile.html");
        exit();
    }else{
        echo "<script>alert('Ientifiant ou mot de passe incorrect');</script>";
    }
}


//Inscription
if(isset($_POST["usernameSignup"]) && isset($_POST["passswordSignup"]) && isset($_POST["emailSignup"])){
    createUser($conn, $_POST["usernameSignup"], $_POST["emailSignup"], $_POST["passwordSignup"]);
    $t = connect($conn, $_POST["usernameSignup"], $_POST["passwordSignup"]);
    if($t["correct"]){
        $_SESSION["user"] = $t["id"];
        header("Location: ../../html/profile.html");
        exit();
    }else{
        echo "<script>alert('La création du compte a échoué');</script>";
    }
}

include("../../html/login.html");
?>