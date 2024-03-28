const showMoreBtn = document.getElementById("btn_show_more");
const showMoreInfo = document.getElementById("movie_show_more_container");

showMoreBtn.addEventListener("click", () => {
    // Checking if the additional information is currently hidden
    if (showMoreInfo.style.display === "none" || showMoreInfo.style.display === "") {
        showMoreBtn.textContent = "Moins d'informations"; // Change button text to indicate hiding information
        showMoreInfo.style.display = "block"; // Show the additional information
    } else {
        showMoreBtn.textContent = "Plus d'informations"; // Change button text to indicate showing more information
        showMoreInfo.style.display = "none"; // Hide the additional information
    }
});


window.addEventListener("load", (event1)=>{
    let filmId= new URLSearchParams(window.location.search).get("id");
    fetchFilm(filmId);
})

function showFilm(film){
    const titre = document.getElementById("titre");
    const image = document.getElementById("image");
    const description = document.getElementById("movie_synopsis");
    const annee = document.getElementById("annee");
    const genres = document.getElementById("movie_genre");
    const temps = document.getElementById("movie_time");
    const realisateur = document.getElementById("movie_director");
    const acteurs = document.getElementById("movie_actor");
    const banniere = document.getElementById("banniere_image");

    banniere.src = film.image_banniere;
    acteurs.textContent = film.acteur_principal+", "+film.acteur_secondaire;
    realisateur.textContent = film.realisateur;
    temps.textContent = film.duree +"min";
    genres.textContent = film.genre_principal+", "+film.genre_secondaire;
    titre.textContent = film.nom_film;
    annee.textContent = film.annee;
    image.src = film.image;
    description.textContent = film.description;


    const acheterBilletBtn = document.getElementById("btn_buy_ticket");

    acheterBilletBtn.href = "billets.html?id="+film.id;
}

async function fetchFilm(filmId){
    const responseFilm = await fetch("http://localhost/api/films/filmid/"+filmId);
    const contenu = await responseFilm.json();
    showFilm(contenu);
}

