window.addEventListener("load", (event1) => {
    fetchDemandesFilm();
});

async function fetchDemandesFilm() {
    const response = await fetch("http://localhost/api/demande/admin/ajout/films");
    const content = await response.json();
    afficherDemandesFilm(content);
    if (content.erreur) {
        alert(content.erreur);
    }
}

function afficherDemandesFilm(demandes) {
    const itemList = document.getElementById("demande_film_liste");
    demandes.forEach(element => {
        const div = document.createElement("div");
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#" + element.id;
        link.addEventListener("click", (event) => {
            if (document.getElementById("div" + element.id).querySelector("#ul"+element.id) == null) {
                fetchInfoFilm(element.id);
            }
            if(document.getElementById("ul_opened")!=null){
                document.getElementById("ul_opened").remove();
            }
        });
        div.id = "div" + element.id;
        link.appendChild(document.createTextNode(element.nom_film));
        item.appendChild(link);
        div.appendChild(item);
        itemList.appendChild(div);
    });
}

async function fetchInfoFilm(id) {
    const response = await fetch(`http://localhost/api/demande/admin/ajout/film/${id}`);
    const content = await response.json();
    console.log(content);
    afficherInfoFilm(content);
    if (content.erreur) {
        alert(content.erreur);
    }
}

function afficherInfoFilm(info) {
    const div = document.getElementById("div" + info.id);
    const ul = document.createElement("ul");
    ul.id = "ul_opened";
    ul.appendChild(document.createElement("li")).textContent = "Nom du film: " + info.nom_film;
    ul.appendChild(document.createElement("li")).textContent = "Image: " + info.image;
    ul.appendChild(document.createElement("li")).textContent = "Image bannière: " + info.image_banniere;
    ul.appendChild(document.createElement("li")).textContent = "Description: " + info.description;
    ul.appendChild(document.createElement("li")).textContent = "Genre principal: " + info.genre_principal;
    ul.appendChild(document.createElement("li")).textContent = "Genre secondaire: " + info.genre_secondaire;
    ul.appendChild(document.createElement("li")).textContent = "Année: " + info.annee;
    ul.appendChild(document.createElement("li")).textContent = "Durée: " + info.duree;
    ul.appendChild(document.createElement("li")).textContent = "Réalisateur: " + info.realisateur;
    ul.appendChild(document.createElement("li")).textContent = "Acteur principal: " + info.acteur_principal;
    ul.appendChild(document.createElement("li")).textContent = "Acteur secondaire: " + info.acteur_secondaire;
    const abutton = document.createElement("button");
    abutton.textContent = "Accepter";
    abutton.id = "demande_film_accepter" + info.id;
    abutton.addEventListener("click", (event) => {
        accepterDemande(info);
    });
    const rbutton = document.createElement("button");
    rbutton.textContent = "Refuser";
    rbutton.id = "demande_film_refuser" + info.id;
    ul.appendChild(abutton);
    ul.appendChild(rbutton);
    div.appendChild(ul);
}

async function accepterDemande(info) {
    const info_film = {
        nom_film: info.nom_film,
        image: info.image,
        image_banniere: info.image_banniere,
        description: info.description,
        genre_principal: info.genre_principal,
        genre_secondaire: info.genre_secondaire,
        annee: info.annee,
        duree: info.duree,
        realisateur: info.realisateur,
        acteur_principal: info.acteur_principal,
        acteur_secondaire: info.acteur_secondaire,
    }
    const response = await fetch(`http://localhost/api/films/ajout`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info_film)
        });
    const content = await response.json();
    if (content.erreur) {
        alert(content.erreur);
    } else {
        alert("La demande a été acceptée avec succès");
    }
}