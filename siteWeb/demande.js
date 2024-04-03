window.addEventListener("load", (event1) => {
    const btnTabDemandeFilm=document.querySelector("#film_button");
    const btnTabDemandeCinema=document.querySelector("#cinema_button");
    btnTabDemandeFilm.addEventListener("click", (event) => {
        document.querySelector("#demande_film").style.display="block";
        document.querySelector("#demande_cinema").style.display="none";
        btnTabDemandeFilm.style.backgroundColor="gray";
        btnTabDemandeCinema.style.backgroundColor="white";
        console.log("film");
    });
    btnTabDemandeCinema.addEventListener("click", (event) => {
        document.querySelector("#demande_film").style.display="none";
        document.querySelector("#demande_cinema").style.display="block";
        btnTabDemandeFilm.style.backgroundColor="white";
        btnTabDemandeCinema.style.backgroundColor="gray";
        console.log("cinema");
    });
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
            if (document.getElementById("div" + element.id).querySelector("#ul_opened") == null) {
                fetchInfoFilm(element.id);
            }
            else{
                document.getElementById("ul_opened").remove();
            }
        });
        div.className = "demande_div_item";
        div.id = "div" + element.id;
        link.appendChild(document.createTextNode(element.nom_film));
        div.appendChild(link);
        item.appendChild(div);
        itemList.appendChild(item);
    });
}

async function fetchInfoFilm(id) {
    const response = await fetch(`http://localhost/api/demande/admin/ajout/film/${id}`);
    const content = await response.json();
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
    ul.appendChild(document.createElement("li")).textContent = "Image (URL): " + info.image;
    img=document.createElement("img");
    img.src=info.image;
    ul.appendChild(document.createElement("li")).appendChild(img);
    imgBanniere=document.createElement("img");
    imgBanniere.src=info.image_banniere;
    ul.appendChild(document.createElement("li")).appendChild(imgBanniere);
    ul.appendChild(document.createElement("li")).textContent = "Image bannière (URL): " + info.image_banniere;
    ul.appendChild(document.createElement("li")).textContent = "Description: " + info.description;
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
        enleverDemande(info);
    });
    const rbutton = document.createElement("button");
    rbutton.textContent = "Refuser";
    rbutton.id = "demande_film_refuser" + info.id;
    rbutton.addEventListener("click", (event) => {
        enleverDemande(info);

    });
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
        return;
    } else {
    }
}

async function enleverDemande(info) {
    const response = await fetch(`http://localhost/api/demande/admin/refus/film/${info.id}`,
        {
            method: 'DELETE',
        });
    const content = await response.json();
    if (content.erreur) {
        alert(content.erreur);
        return;
    } else {
        window.location.reload();
    }
}