<?php
session_start();

require_once __DIR__."/../db/db_connect.php";
require_once __DIR__."/../CRUD/user.crud.php";

//Connexion
if(isset($_POST["usernameLogin"]) && isset($_POST["passwordLogin"])){
    $t = connect($conn, $_POST["usernameLogin"], $_POST["passwordLogin"]);
    if($t["correct"]){
        $_SESSION["user"] = $t["id"];
        header("Location: /mael/html/profile.html");
        exit();
    }else{
        echo "<script>alert('Ientifiant ou mot de passe incorrect');</script>";
    }
}

//Inscription
if(isset($_POST["usernameSignup"]) && isset($_POST["passwordSignup"]) && isset($_POST["emailSignup"])){
    $usernameSignup = $_POST["usernameSignup"];
    $emailSignup = $_POST["emailSignup"];
    
    // Vérifier que l'email n'existe pas deja
    $checkEmailQuery = "SELECT `id` FROM `utilisateurs` WHERE `email`='$emailSignup'";
    $checkEmailRet = mysqli_query($conn, $checkEmailQuery);
    $emailExists = mysqli_num_rows($checkEmailRet) > 0;
    
    // Vérifier que le pseudo n'existe pas deja
    $checkPseudoQuery = "SELECT `id` FROM `utilisateurs` WHERE `pseudo`='$usernameSignup'";
    $checkPseudoRet = mysqli_query($conn, $checkPseudoQuery);
    $pseudoExists = mysqli_num_rows($checkPseudoRet) > 0;
    
    if($emailExists){
        echo "<script>alert('Cette adresse email existe déjà');</script>";
    } else if($pseudoExists){
        echo "<script>alert('Ce pseudo existe déjà');</script>";
    } else {
        createUser($conn, $usernameSignup, $emailSignup, $_POST["passwordSignup"]);
        $t = connect($conn, $usernameSignup, $_POST["passwordSignup"]);
        if($t["correct"]){
            $_SESSION["user"] = $t["id"];
            header("Location: /mael/html/profile.html");
            exit();
        }else{
            echo "<script>alert('La création du compte a échoué');</script>";
        }
    }
}

include("../../html/login.html");
?>