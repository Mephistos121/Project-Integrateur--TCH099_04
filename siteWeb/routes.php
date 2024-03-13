<?php

require_once __DIR__ . '/router.php';




// A route with a callback
get('/api/comptes', function () {
    $DBuser = 'sql5686135';
    $DBpass = 'CA2jADw66h';
    $pdo = null;

    try{
        $database = 'mysql:host=sql5.freesqldatabase.com:3306;dbname=sql5686135';
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

    $DBuser = 'sql5686135';
    $DBpass = 'CA2jADw66h';
    $pdo = null;

    try{
        $database = 'mysql:host=sql5.freesqldatabase.com:3306;dbname=sql5686135';
        $pdo = new PDO($database, $DBuser, $DBpass);   
    } catch(PDOException $e) {
        echo "Error: Unable to connect to MySQL. Error:\n $e";
    }

    $nom = $data["nom"];
    $courriel = $data["courriel"];
    $mot_passe = $data["mot_passe"];
    
    $requete = $pdo->prepare(
        "INSERT INTO comptes (nom, courriel, mot_passe) 
        VALUES (?, ?, ?);"
        );
    header('Content-type: application/json');
    $requete->execute([$nom, $courriel, $mot_passe]);
    echo json_encode($requete);
});