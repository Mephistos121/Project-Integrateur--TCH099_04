<?php
require_once __DIR__ . '/router.php';
function connectionBD(){
    $DBuser = 'sql5686135';
    $DBpass = 'CA2jADw66h';
    $pdo = null;

    try{
        $database = 'mysql:host=sql5.freesqldatabase.com:3306;dbname=sql5686135';
        $pdo = new PDO($database, $DBuser, $DBpass);   
    } catch(PDOException $e) {
        echo "Error: Unable to connect to MySQL. Error:\n $e";
    }
    return $pdo;
}
// A route with a callback
get('/api/comptes', function () {
   $pdo=connectionBD();

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

    $pdo=connectionBD();

    $nom = $data["nom"];
    $courriel = $data["courriel"];
    $mot_passe = $data["mot_passe"];
    $salt = $data["salt"];
    $privilege = $data["privilege"];
    if($privilege){
        $gestionnaire = "gestionnaire";
    }else{
        $gestionnaire = "default";
    }
    
    $requete = $pdo->prepare(
        "INSERT INTO Eq4_usager (nom_usager, email, password, role, salt) 
        VALUES (?, ?, ?, ?, ?);"
        );
    header('Content-type: application/json');
    $saltpass = $salt.$mot_passe;
    $requete->execute([$nom, $courriel, hash('sha256',$saltpass), $gestionnaire, $salt]);
    echo json_encode($requete);
});


get('/api/comptes/$courriel', function ($courriel) {
    $pdo=connectionBD();
    $requete = $pdo->prepare(
        "SELECT * FROM Eq4_usager WHERE email = ?;"
    );

    $requete->execute([$courriel]);

    $compte = $requete->fetch();

    header('Content-type: application/json');
    echo json_encode($compte);
});

post('/api/connexion', function() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $pdo=connectionBD();
    $courriel = $data["courriel"];
    $mot_passe = $data["mot_passe"];
    $salt = $data["salt"];

    $requete = $pdo->prepare(
        "SELECT id, role FROM Eq4_usager WHERE email = ? AND password = ?;"
    );

    $saltpass = $salt.$mot_passe;
    $requete->execute([$courriel, hash('sha256',$saltpass)]);

    $compte = $requete->fetch();
    header('Content-type: application/json');   
    echo json_encode($compte);
});

delete('/api/comptes/$id', function ($id) {
    $pdo = connectionBD();
    $requete = $pdo->prepare(
        "DELETE FROM Eq4_usager WHERE id = ?;"
    );

    $requete->execute([$id]);

    header('Content-type: application/json');
    echo json_encode(["message" => "Le compte a été supprimé avec succès"]);
});

post('/api/cinemas', function(){
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $pdo=connectionBD();

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
});

get('/api/cinemas/gestionnaire/$id', function($id){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT  nom_cinema, localisation FROM Eq4_cinema WHERE gestionnaire_id = ?;"
    );
    $requete->execute([$id]);
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
        
});
get('/api/cinemas', function(){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT * FROM Eq4_cinema;"
    );
    $requete->execute();
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
});

get('/api/films', function(){
   $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT * FROM Eq4_film;"
    );
    $requete->execute();
    
    $films = $requete->fetchAll();
    header('Content-type: application/json');

    echo json_encode($films);
});
post('/api/films/ajout',function(){
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $pdo=connectionBD();
        $nom = $data["nom_film"];
        $image = $data["image"];
        $description = $data["description"];
        $valid=checkRemoteFile($image);
        if($valid){
            $requete = $pdo->prepare(
                "INSERT INTO Eq4_film (nom_film, image, description)
                VALUES (?,?,?);"
            );
            header('Content-type: application/json');
            $requete->execute([$nom, $image, $description]);
            echo json_encode($requete);
        }
        else{
            $error = array("erreur" => "Ceci ne semble pas etre une image valide, veuillez en prendre une autre.");
            echo json_encode($error);
        }
});

get('/api/cinemas/$cinema', function($cinemaId){
    $pdo=connectionBD();
    $requete = $pdo->prepare(
        "SELECT * FROM `Eq4_cinema` WHERE `id`=?"
    );
    $requete->execute([$cinemaId]);
    $cinema = $requete->fetch();
    header('Content-type: application/json');
   
    echo json_encode($cinema);
});

get('/api/films/$cinema', function($cinema){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT `Eq4_film`.* FROM `Eq4_film`,`Eq4_cinema`,`Eq4_representation` WHERE `Eq4_film`.`id`=`Eq4_representation`.`film_id` AND `Eq4_representation`.`cinema_id`=`Eq4_cinema`.`id` AND `Eq4_cinema`.`id`=?"
    );
    $requete->execute([$cinema]);
    $films = $requete->fetchAll();
    header('Content-type: application/json');

    echo json_encode($films);
});
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