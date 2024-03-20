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
        "SELECT nom_usager, email, password FROM Eq4_usager;"
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
        "INSERT INTO Eq4_usager (nom_usager, email, password, role) 
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
        "SELECT email FROM Eq4_usager WHERE email = ?;"
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
        "SELECT id, role FROM Eq4_usager WHERE email = ? AND password = ?;"
    );

    $requete->execute([$courriel, $mot_passe]);

    $compte = $requete->fetch();
    header('Content-type: application/json');   
    echo json_encode($compte);
});
post('/api/cinemas', function(){
    function checkRemoteFile($url){ 
        $headers = @get_headers($url); 
        if($headers){
          foreach ($headers as $line){
            if(strpos( $line, 'image')) { 
              return true;
            } 
          }
        }
        return false;
    } 
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
            $localisation = $data["localisation"];
            $gestionnaire = $data["gestionnaire"];
            $image = $data["image"];
            $valid=checkRemoteFile($image);
            if($valid){
                $requete = $pdo->prepare(
                    "INSERT INTO Eq4_cinema (nom_cinema, image, localisation, gestionnaire_id)
                    VALUES (?,?,?,?);"
                );
                header('Content-type: application/json');
                $requete->execute([$nom, $image, $localisation, $gestionnaire]);
                echo json_encode($requete);
            }
            else{
                $error = array("erreur" => "Ceci ne semble pas etre une image valide, veuillez en prendre une autre.");
                echo json_encode($error);
            }
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
        "SELECT  nom_cinema, localisation FROM Eq4_cinema WHERE gestionnaire_id = ?;"
    );
    $requete->execute([$id]);
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
        
});
get('/api/cinemas', function(){
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
        "SELECT * FROM Eq4_cinema;"
    );
    $requete->execute();
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
});

get('/api/films', function(){
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
        "SELECT * FROM Eq4_film;"
    );
    $requete->execute();
    
    $films = $requete->fetchAll();
    header('Content-type: application/json');

    echo json_encode($films);
});

get('/api/cinemas/$cinema', function($cinemaId){
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
        "SELECT * FROM `Eq4_cinema` WHERE `id`=?"
    );
    $requete->execute([$cinemaId]);
    $cinema = $requete->fetch();
    header('Content-type: application/json');
   
    echo json_encode($cinema);
});

get('/api/films/$cinema', function($cinema){
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
        "SELECT `Eq4_film`.* FROM `Eq4_film`,`Eq4_cinema`,`Eq4_representation` WHERE `Eq4_film`.`id`=`Eq4_representation`.`film_id` AND `Eq4_representation`.`cinema_id`=`Eq4_cinema`.`id` AND `Eq4_cinema`.`id`=?"
    );
    $requete->execute([$cinema]);
    $films = $requete->fetchAll();
    header('Content-type: application/json');

    echo json_encode($films);
});