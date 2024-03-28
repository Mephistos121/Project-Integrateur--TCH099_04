window.addEventListener('load', (event1) =>{
    const perms=cookieGetter("privilege");
    const sbutton = document.querySelector("#film_ajout");
    const ubutton = document.querySelector("#film_update");
    if(perms==="administrateur"){
        sbutton.addEventListener("click", (event3) => {
            
            const info_film = {
            nom_film: document.querySelector("#film_nom").value,
            image: document.querySelector("#film_img").value,
            description: document.querySelector("#film_desc").value,
            };
            
            let check=true;
            Object.keys(info_film).forEach(element => {
                if (info_film[element]==="") check=false;
            });
                check ? ajouterNouveauFilm(info_film) : alert("Veuillez entrer toutes les informations du compte");
        });
    }else{
        sbutton.disabled = true;
    }
    ubutton.addEventListener("click", (event4) => {
        const id_film = window.location.hash.substring(1);
        const info_film = {
        id:id_film,
        nom_film: document.querySelector("#update_nom_film").value,
        image: document.querySelector("#update_image_film").value,
        image_banniere: document.querySelector("#update_image_banniere").value,
        description: document.querySelector("#update_description").value,
        genre_principal: document.querySelector("#update_genre_principal").value,
        genre_secondaire: document.querySelector("#update_genre_secondaire").value,
        annee: document.querySelector("#update_annee").value,
        duree: document.querySelector("#update_duree").value,
        realisateur: document.querySelector("#update_realisateur").value,
        acteur_principal: document.querySelector("#update_acteur_principal").value,
        acteur_secondaire: document.querySelector("#update_acteur_secondaire").value,
        };
        let check=true;
        Object.keys(info_film).forEach(element => {
            if (info_film[element]==="") check=false;
        });
        check ? updateFilm(info_film) : alert("Veuillez entrer toutes les informations du film");
    });
    fetchListeFilms();
});

async function ajouterNouveauFilm(film){
    const filmResponse = await fetch("http://localhost/api/films/ajout", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
    });
    const content = await filmResponse.json();
    console.log(content);
    if(content.erreur){
        alert(content.erreur);
    }else{
        alert("Le film a été ajouté avec succès");
    }
}

async function fetchListeFilms(){
    const filmResponse = await fetch("http://localhost/api/films")
    const content = await filmResponse.json();
    afficherListeFilm(content);
    if(content.erreur){
        alert(content.erreur);
    }
}

function afficherListeFilm(films){
    const itemList = document.querySelector("#liste_films");
    films.forEach(element => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#"+element.id;
        link.addEventListener("click", (event) => {
            fetchFilm(element.id);
        });
        link.appendChild(document.createTextNode(element.nom_film));
        item.appendChild(link);
        itemList.appendChild(item);
    });
}

async function fetchFilm(id){
    const filmResponse = await fetch(`http://localhost/api/films/filmid/${id}`)
    const film = await filmResponse.json();
    updateFormFilm(film);
    if(film.erreur){
        alert(film.erreur);
    }
}

function updateFormFilm(film){
    document.getElementById('update_nom_film').value=film.nom_film;
    document.getElementById('update_image_film').value=film.image;
    document.getElementById('update_image_banniere').value=film.image_banniere;
    document.getElementById('update_description').value=film.description;
    document.getElementById('update_genre_principal').value=film.genre_principal;
    document.getElementById('update_genre_secondaire').value=film.genre_secondaire;
    document.getElementById('update_annee').value=film.annee;
    document.getElementById('update_duree').value=film.duree;
    document.getElementById('update_realisateur').value=film.realisateur;
    document.getElementById('update_acteur_principal').value=film.acteur_principal;
    document.getElementById('update_acteur_secondaire').value=film.acteur_secondaire;
}

async function updateFilm(film){
    const filmResponse = await fetch(`http://localhost/api/films/update`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
    });
    const content = await filmResponse.json();
    console.log(content);
    if(content.erreur){
        alert(content.erreur);
    }else{
        alert("Le film a été mis à jour avec succès");
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
