<?php

function createData($conn, $id_user, $transport, $alimentaire, $logement){
    $sql = "INSERT INTO `donnee_carbone`(`id_utilisateur`,`transport`,`alimentaire`,`logement`) VALUES ('$id_user', '$transport', '$alimentaire', '$logement')";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateData($conn, $id, $transport, $alimentaire, $logement){
    $sql = "UPDATE `donnee_crabone` SET `transport`='$transport', `alimentaire`='$alimentaire', `logement`='$logement' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteData($conn,$id){
    $sql = "DELETE FROM `donnee_carbone` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if(!$ret){
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function selectData($conn, $id){
    $sql = "SELECT * FROM `donnee_carbone` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if($ret){
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

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