<?php
require_once __DIR__ . '/router.php';
//Fonctions
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

//Demanses

//GET
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
get('/api/films/filmid/$id', function($id){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT * FROM Eq4_film WHERE id=?"
    );
    $requete->execute([$id]);
    $film = $requete->fetch();
    header('Content-type: application/json');
    echo json_encode($film);
});

//POST
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
post('/api/demande/cinema',function(){
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
            "INSERT INTO Eq4_demande_cinema (id_usager,nom_cinema, image, localisation)
            VALUES (?,?,?,?);"
        );
        header('Content-type: application/json');
        $requete->execute([$gestionnaire,$nom, $image, $localisation]);
        echo json_encode($requete);
    }
    else{
        $error = array("erreur" => "Ceci ne semble pas etre une image valide, veuillez en prendre une autre.");
        echo json_encode($error);
    }
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
post('/api/demande/ajout/film',function(){
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $pdo=connectionBD();
        $id_usager = intval($data["id_usager"]);
        $nom = htmlspecialchars($data["nom_film"]);
        $image = htmlspecialchars($data["image"]);
        $image_banniere = htmlspecialchars($data["image_banniere"]);
        $description = htmlspecialchars($data["description"]);
        $genre_principal = htmlspecialchars($data["genre_principal"]);
        $genre_secondaire = htmlspecialchars($data["genre_secondaire"]);
        $annee = intval($data["annee"]);
        $duree = intval($data["duree"]);
        $realisateur = htmlspecialchars($data["realisateur"]);
        $acteur_principal = htmlspecialchars($data["acteur_principal"]);
        $acteur_secondaire = htmlspecialchars($data["acteur_secondaire"]);

        $valid=checkRemoteFile($image);
        $valid2=checkRemoteFile($image_banniere);
        if($valid && $valid2){
            $requete = $pdo->prepare(
                "INSERT INTO Eq4_demande_film (id_usager,nom_film, image, description,image_banniere,
                genre_principal,genre_secondaire,annee,duree,realisateur,acteur_principal,acteur_secondaire)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
            );
            header('Content-type: application/json');
            $requete->execute([$id_usager,$nom, $image, $description,$image_banniere,$genre_principal,
            $genre_secondaire,$annee,$duree,$realisateur,$acteur_principal,$acteur_secondaire]);
            $result = $requete->fetch(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }
        else{
            $error = array("erreur" => "Ceci ne semble pas etre une image valide, veuillez en prendre une autre.");
            echo json_encode($error);
        }
});
get('/api/demande/ajout/film/gestionnaire/$id', function($id){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT  nom_film FROM Eq4_demande_film WHERE id_usager = ?;"
    ); 
    $requete->execute([$id]);
    
    $film = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($film);
});
get('/api/demande/ajout/cinema/gestionnaire/$id', function($id){
    $pdo=connectionBD();

    $requete = $pdo->prepare(
        "SELECT  nom_cinema, localisation FROM Eq4_demande_cinema WHERE id_usager = ?;"
    ); 
    $requete->execute([$id]);
    
    $cinemas = $requete->fetchAll();
    header('Content-type: application/json');   
    echo json_encode($cinemas);
});

//DELETE
delete('/api/comptes/$id', function ($id) {
    $pdo = connectionBD();
    $requete = $pdo->prepare(
        "DELETE FROM Eq4_usager WHERE id = ?;"
    );

    $requete->execute([$id]);

    header('Content-type: application/json');
    echo json_encode(["message" => "Le compte a été supprimé avec succès"]);
});

//UPDATE
put('/api/films/update', function(){
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $pdo=connectionBD();

    $id = intval($data["id"]);
    $nom = htmlspecialchars($data["nom_film"]);
    $image = htmlspecialchars($data["image"]);
    $image_banniere = htmlspecialchars($data["image_banniere"]);
    $description = htmlspecialchars($data["description"]);
    $genre_principal = htmlspecialchars($data["genre_principal"]);
    $genre_secondaire = htmlspecialchars($data["genre_secondaire"]);
    $annee = intval($data["annee"]);
    $duree = intval($data["duree"]);
    $realisateur = htmlspecialchars($data["realisateur"]);
    $acteur_principal = htmlspecialchars($data["acteur_principal"]);
    $acteur_secondaire = htmlspecialchars($data["acteur_secondaire"]);

    $valid=checkRemoteFile($image);
    $valid2=checkRemoteFile($image_banniere);
    if($valid && $valid2){
    $requete = $pdo->prepare("UPDATE Eq4_film SET nom_film = ?, image = ?, image_banniere = ?, description = ?, 
    genre_principal = ?, genre_secondaire = ?, annee = ?, duree = ?, 
    realisateur = ?, acteur_principal = ?, acteur_secondaire = ? WHERE id = ?");
    header('Content-type: application/json');
    $requete->execute([$nom, $image, $image_banniere, $description, $genre_principal, 
    $genre_secondaire, $annee, $duree, $realisateur, $acteur_principal, $acteur_secondaire, $id]);
    echo json_encode($requete);
    }
    else{
        $error = array("erreur" => "Ceci ne semble pas etre une image valide, veuillez en prendre une autre.");
        echo json_encode($error);
    }
});
?>