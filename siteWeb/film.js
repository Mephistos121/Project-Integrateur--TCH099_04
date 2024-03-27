
const showMoreBtn = document.getElementById("btn_show_more");
const showMoreInfo = document.getElementById("movie_show_more_container");

showMoreBtn.addEventListener("click", () => {
    console.log("Show more button clicked");
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
    const description = document.getElementById("movie_synopsis")

    titre.textContent = film.nom_film;
    image.src = film.image;
    description.textContent = film.synopsis;

}

async function fetchFilm(filmId){
    const responseFilm = await fetch("http://localhost/api/films/"+filmId);
    const contenu = await responseFilm.json();

    showFilm(contenu);
}

