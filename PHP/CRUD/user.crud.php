<?php

function createUser($conn, $pseudo, $mail, $mdp){
    $hashMdp = hash("sha256", $mdp);
    $sql = "INSERT INTO `utilisateurs`(`pseudo`, `email`, `mdp`) VALUES ('$pseudo', '$mail', '$hashMdp')";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: ". mysqli_error($conn);
    }
    return $ret;
}

function updateUser($conn, $id, $pseudo, $mail, $mdp){
    $sql = "UPDATE `utilisateurs` SET `pseudo`='$pseudo', `email`='$mail', `mdp`='$mdp' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteUser($conn, $id){
    $sql = "DELETE FROM `utilisateurs` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if($ret){
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

# regarde si c'est un mail ou non l'identifien utiliser
function loginSource($login){
    $res = false;
    for($i=0;$i<strlen($login);$i++){
        if($login[$i]=="@"){
            $res = true;
        }
    }
    return $res;
}

function connect(mysqli $conn, string $login, string $mdp): array {
    $hashMdp = hash("sha256", $mdp);
    if(loginSource($login)){
        $query = "SELECT `id` FROM `utilisateurs` WHERE `email`='$login' AND `mdp`='$hashMdp'";
    } else {
        $query = "SELECT `id` FROM `utilisateurs` WHERE `pseudo`='$login' AND `mdp`='$hashMdp'";
    }
    $ret = mysqli_query($conn, $query);

    $id = null;
    $isCorrect = false;

    if($ret != false){
        while($r = mysqli_fetch_assoc($ret)){
            $id = $r["id"];
            $isCorrect = true;
            break;
        }
    }

    $res = [
        "id" => $id,
        "correct" => $isCorrect
    ];
    return $res;
}

function getUserById($conn, $id){
    $query = "SELECT `id`, `pseudo`, `email` FROM `utilisateurs` WHERE `id`=$id";
    $ret = mysqli_query($conn, $query);
    
    if($ret && mysqli_num_rows($ret) > 0){
        return mysqli_fetch_assoc($ret);
    }
    return null;
}

?>