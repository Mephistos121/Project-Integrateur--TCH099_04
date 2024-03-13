<?php

require_once __DIR__ . '/router.php';




// A route with a callback
get('/api/comptes', function () {
    $DBuser = 'root';
    $DBpass = $_ENV['MYSQL_ROOT_PASSWORD'];
    $pdo = null;

    try{
        $database = 'mysql:host=database:3306;dbname=cinemadata';
        $pdo = new PDO($database, $DBuser, $DBpass);   
    } catch(PDOException $e) {
        echo "Error: Unable to connect to MySQL. Error:\n $e";
    }

    $requete = $pdo->prepare(
        "SELECT nom, courriel, mot_passe FROM comptes;"
    );

    $requete->execute();

    $compte = $requete->fetchall();

    header('Content-type: application/json');
    echo json_encode($compte);
});




post('/api/comptes', function() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $DBuser = 'root';
    $DBpass = $_ENV['MYSQL_ROOT_PASSWORD'];
    $pdo = null;

    try{
        $database = 'mysql:host=database:3306;dbname=cinemadata';
        $pdo = new PDO($database, $DBuser, $DBpass); 
    } catch(PDOException $e) {
        echo "Error: Unable to connect to MySQL. Error:\n $e";
    }

    $nom = $data["nom"];
    $courriel = $data["courriel"];
    $mot_passe = $data["mot_passe"];

    if ($type2==""){
        $type2=null;
    }
    
    $requete = $pdo->prepare(
        "INSERT INTO comptes (nom, courriel, mot_passe) 
        VALUES (?, ?, ?);"
        );
    header('Content-type: application/json');
    $requete->execute([$nom, $courriel, $mot_passe]);
    echo json_encode($requete);
});