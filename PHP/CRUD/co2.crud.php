<?php
// Création de donnée
function createData($conn, $id_user, $transport, $alimentaire, $logement, $numerique){
    $sql = "INSERT INTO `donnee_carbone`(`id_utilisateur`,`transport`,`alimentaire`,`logement`,`numerique`) VALUES ('$id_user', '$transport', '$alimentaire', '$logement', '$numerique')";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

// Mise a jour des données
function updateData($conn, $id, $transport, $alimentaire, $logement, $numerique){
    $sql = "UPDATE `donnee_carbone` SET `transport`='$transport', `alimentaire`='$alimentaire', `logement`='$logement', `numerique`='$numerique' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

// Suppression de donnée
function deleteData($conn,$id){
    $sql = "DELETE FROM `donnee_carbone` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

// Selection des données
function selectData($conn, $id){
    $sql = "SELECT * FROM `donnee_carbone` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if($ret){
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

// Selection des données en fonction de l'auteur de celle-ci
function selectDataByUser($conn, $id_user){
    $sql = "SELECT * FROM `donnee_carbone` WHERE `id_utilisateur`=$id_user";
    $ret = mysqli_query($conn, $sql);
    if($ret){
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

?>