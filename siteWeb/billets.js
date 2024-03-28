window.addEventListener("load", (event1) => {
    let filmid= new URLSearchParams(window.location.search).get("id");
    fetchCinema(filmid);
});

function afficherListeCinema(liste){
    const listeC = document.getElementById("liste_cinema");
    const listeR = document.getElementById("liste_representation");
    liste.forEach(film => {
        const newCinema = document.createElement("p");
        newCinema.textContent = film.nom_cinema+" "+film.emplacement;
        const newRepresentation = document.createElement("p");
        newRepresentation.textContent = film.temps;
        newRepresentation.addEventListener("click", () => {
            fetchSalle(film.salle_id);
        });
        listeC.append(newCinema);
        listeR.append(newRepresentation);
    });

}


function afficherListePlace(liste,cout,repid){
    const listeP = document.getElementById("liste_place");
    while (listeP.firstChild) {
        listeP.removeChild(listeP.lastChild);
    }
    liste.forEach(siege => {
        const newPlace = document.createElement("a");
        newPlace.textContent = siege+" ";
        newPlace.href = "payer.html?place="+siege+"?id="+repid;
        listeP.append(newPlace);
    });
    const prix = document.getElementById("cout_siege");
    prix.textContent = cout +"$";
}


async function fetchCinema(filmid){
    const responseFilm = await fetch("http://localhost/api/cinemas/film/"+filmid);
    const liste = await responseFilm.json();
    
    afficherListeCinema(liste);
}

async function fetchSalle(repid){
    const responseFilm = await fetch("http://localhost/api/salle/representation/"+repid);
    const salle = await responseFilm.json();
    const liste = (salle.sieges).split(",");
    afficherListePlace(liste,salle.cout,repid);
}
