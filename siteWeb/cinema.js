function showFilms(films) {
    films.forEach(film => {
        const list = document.getElementById("index_list");
        const filmListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const filmTitle = document.createElement("p");
        const filmLink = document.createElement("a");

        imgPoster.src = film.image;
        imgPoster.alt = film.nom_film;
        filmTitle.textContent = film.nom_film;

        filmLink.href =`film.html?title=${film.id}`;
        filmLink.appendChild(imgPoster);
        filmLink.appendChild(filmTitle);
        filmListItem.appendChild(filmLink);
        list.appendChild(filmListItem);
    });
}

window.addEventListener("load", (event1) => {
    
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenCinemaId = typeParams.get("title");
    
    

    putCinemaName(chosenCinemaId);
    fetchAllFilm(chosenCinemaId);
});

async function putCinemaName(cinemaId){
    const responseCinema = await fetch("http://localhost/api/cinemas/"+cinemaId);
    const contenu = await responseCinema.json();

    const header = document.getElementById("index_header");

    header.textContent= "Films du cinema "+contenu.nom_cinema;

}

async function fetchAllFilm(cinemaId){
    const responseFilm = await fetch("http://localhost/api/films/"+cinemaId);
    const contenu = await responseFilm.json();

    showFilms(contenu);

}