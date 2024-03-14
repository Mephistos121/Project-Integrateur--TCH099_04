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
    $privilege = $data["privilege"];
    $gestionnaire = "default";
    if($privilege==true){
        $gestionnaire = "gestionnaire";
    }
    
    $requete = $pdo->prepare(
        "INSERT INTO comptes (nom, courriel, mot_passe, privilege) 
        VALUES (?, ?, ?, ?);"
        );
    header('Content-type: application/json');
    $requete->execute([$nom, $courriel, $mot_passe, $gestionnaire]);
    echo json_encode($requete);
});
get('/api/comptes/$courriel', function ($courriel) {
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
        "SELECT courriel FROM comptes WHERE courriel = ?;"
    );

    $requete->execute([$courriel]);

    $compte = $requete->fetch();

    header('Content-type: application/json');
    echo json_encode($compte);
});



post('/api/connexion', function() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $DBuser = 'sql5686135';
    $DBpass = 'CA2jADw66h';
    $pdo = null;

    try {
        $database = 'mysql:host=sql5.freesqldatabase.com:3306;dbname=sql5686135';
        $pdo = new PDO($database, $DBuser, $DBpass);   
    } catch(PDOException $e) {
        echo "Error: Unable to connect to MySQL. Error:\n $e";
        return;
    }

    $courriel = $data["courriel"];
    $mot_passe = $data["mot_passe"];

    $requete = $pdo->prepare(
        "SELECT id, privilege FROM comptes WHERE courriel = ? AND mot_passe = ?;"
    );

    $requete->execute([$courriel, $mot_passe]);

    $compte = $requete->fetch();
    header('Content-type: application/json');   
    echo json_encode($compte);
});
post('/api/cinemas', function(){
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
            $emplacement = $data["emplacement"];
            $gestionnaire = $data["gestionnaire"];
            $image = $data["image"];
        
            $requete = $pdo->prepare(
                "INSERT INTO cinemas (nom, image, emplacement, gestionnaire_id)
                VALUES (?,?,?,?);"
            );
            header('Content-type: application/json');
            $requete->execute([$nom, $image, $emplacement, $gestionnaire]);
            echo json_encode($requete);
        }
);

get('/api/cinemas/gestionnaire/$id', function($id){
    $json = file_get_contents('php://input');

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
        "SELECT  nom, emplacement FROM cinemas WHERE gestionnaire_id = ?;"
    );
    $requete->execute([$id]);
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
        
});