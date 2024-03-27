window.addEventListener("load", (event1) => {
    let ajoutCinema = document.querySelector("#creer_submit");
    let gestionnaireId=cookieGetter("id");
    cinemaGetter(gestionnaireId);
    
    if(gestionnaireId===false){
        console.log("Erreur pas de ID");
    }
    ajoutCinema.addEventListener("click", (event2) => {
        
        const info_cinema = {
        nom: document.querySelector("#creer_nom").value,
        image: document.querySelector("#creer_image").value,
        localisation: document.querySelector("#creer_localisation").value,
        gestionnaire: document.cookie=gestionnaireId,
        };
        
        let check = true;
        Object.keys(info_cinema).forEach(element => {
            if (info_cinema[element]==="") check=false;
        });
        check ? ajouterNouveauCinema(info_cinema) : alert("Veuillez entrer toutes les informations du cinema");
    });
    async function ajouterNouveauCinema(cinema){
        //validation du nom de cinema
        const responseCinema = await fetch("http://localhost/api/cinemas");
        const content = await responseCinema.json();
        let ajoutValide = true;
        if(content.length){
            Object.keys(content).forEach(element => {
                //console.log("Comparaison entre: "+content[element].nom_cinema +" et "+ cinema.nom);
                if (content[element].nom_cinema==cinema.nom){
                    alert("Ce nom de cinéma est déjà utilisé");
                    ajoutValide = false
                    //console.log(content[element] + " " + cinema.nom);
                }
            });
        }
        //validation adresse avec geoapify
         ajoutValide = validationAdresse(cinema.localisation);
     
        //validation droit d'ajout
        if(cookieGetter("privilege")!="gestionnaire"){
            alert("Vous devez être un gestionnaire pour ajouter des cinémas");
        }

        //si tout est beau on ajoute
        else if(ajoutValide){
            const response = await fetch("http://localhost/api/demande/cinema", {
                    method: 'POST',
                    
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cinema),
                });
                const message = await response.json();
                console.log(message);
                if(message.erreur){
                    alert(message.erreur);
                }
                else if (response.ok){
                alert("success");
                cinemaGetter(gestionnaireId);
                }else {
                    alert("Le serveur a refusé");
                }
        }
    }   
});

const ajoutFilm = document.getElementById("creer_film_submit");

    ajoutFilm.addEventListener("click", (event2) => {
        console.log("click");
        let gestionnaireId=cookieGetter("id");
            
            const info_film = {
            nom_film: document.getElementById("creer_nom_film").value,
            image: document.getElementById("creer_image_film").value,
            image_banniere: document.getElementById("creer_image_banniere").value,
            description: document.getElementById("creer_description").value,
            genre_principal: document.getElementById("creer_genre_principal").value,
            genre_secondaire: document.getElementById("creer_genre_secondaire").value,
            annee: document.getElementById("creer_annee").value,
            duree: document.getElementById("creer_duree").value,
            realisateur: document.getElementById("creer_realisateur").value,
            acteur_principal: document.getElementById("creer_acteur_principal").value,
            acteur_secondaire: document.getElementById("creer_acteur_secondaire").value,
            id_usager: gestionnaireId 
            
        };
        console.log(info_film);

            let check=true;
            Object.keys(info_film).forEach(element => {
                if (info_film[element]==="") check=false;
            });
            check ? ajouterNouveauFilm(info_film) : alert("Veuillez entrer toutes les informations du film");
        });

    async function ajouterNouveauFilm(film){
        if(cookieGetter("privilege")!="gestionnaire"){
            alert("Vous devez être un gestionnaire pour ajouter des films");
        }
            const response = await fetch("http://localhost/api/demandes/ajout/film", {
                    method: 'POST',
                    
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(film),
                });
                const message = await response.json();
                console.log(message);
                if(message.erreur){
                    alert(message.erreur);
                }
                else if (response.ok){
                alert("success");
                }else {
                    alert("Le serveur a refusé");
                }
        }

async function validationAdresse(adresse){
    const response = await fetch("https://api.geoapify.com/v1/geocode/search?text="+adresse+" &format=json&apiKey=c79307b333d645cfba222d71ad09c686")
    const content2 = await response.json();
    console.log(content2);
    if(content2.results.length==0){
      alert("adresse non valide");
      return false;
    }
    return true;
}
async function cinemaGetter(id){
    const responseCinema = await fetch("http://localhost/api/cinemas/gestionnaire/"+id);
    const content = await responseCinema.json();
    if(content.length>0){
        const divList = document.querySelector("div#liste_cinema > div");
        divList.textContent = "";
        const ul = document.createElement('ul');
        divList.append(ul);
        for (let cinema of content) {
           const li = document.createElement("li");
           const div = document.createElement("div");
           div.textContent = cinema.nom_cinema;
           const div2 = document.createElement("div");
           div2.textContent = cinema.localisation;
           
           ul.append(li);
           li.append(div);
           li.append(div2)
    
        }
    }
    
}

function cookieGetter(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if(cookieName === name){
            return cookieValue;
        }
    }
    return false;
}

