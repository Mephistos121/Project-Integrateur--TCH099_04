let featuredFilm = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" }];

let featuredCinema = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" }];

const list = document.getElementById("index_list");
const featuredSlider = document.getElementById("featured_index_slider");
const featuredContainer = document.getElementById("featured_index_container");
const sliderNav = document.getElementById("slider_nav");

function showFilms(films) {
    films.forEach(film => {
        const filmListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const filmTitle = document.createElement("p");
        const filmLink = document.createElement("a");
        
        imgPoster.src = film.image;
        imgPoster.alt = film.nom_film;
        filmTitle.textContent = film.nom_film;

        filmLink.href =`film.html?id=${film.id}`;
        filmLink.appendChild(imgPoster);
        filmLink.appendChild(filmTitle);
        filmListItem.appendChild(filmLink);
        list.appendChild(filmListItem);
    });
}

function showFeaturedFilm(film) {
    let counter = 0;
    film.forEach(film => {
        const imgPoster = document.createElement("img");
        const filmLink = document.createElement("a");

        const sliderNavLink = document.createElement("a");

        imgPoster.src = film.image;
        imgPoster.alt = film.title;
        imgPoster.id = `featured_film_${counter}`;
        filmLink.href = `film.html?id=${film.title}`;
        filmLink.appendChild(imgPoster);
        featuredSlider.appendChild(filmLink);

        sliderNavLink.href = `#featured_film_${counter}`;
        counter++;
        sliderNav.appendChild(sliderNavLink);
    });
}


function showCinemas(cinemas) {
    cinemas.forEach(cinema => {
        const cinemaListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const cinemaTitle = document.createElement("p");
        const cinemaLink = document.createElement("a");

        imgPoster.src = cinema.image;
        imgPoster.alt = cinema.nom_cinema;
        cinemaTitle.textContent = cinema.nom_cinema;

        cinemaLink.href =`cinema.html?title=${cinema.id}`;
        cinemaLink.appendChild(imgPoster);
        cinemaLink.appendChild(cinemaTitle);
        cinemaListItem.appendChild(cinemaLink);
        list.appendChild(cinemaListItem);
    });
}

function showFeaturedCinema(cinemas) {
    let counter = 0;
    cinemas.forEach(cinema => {
        const imgPoster = document.createElement("img");
        const cinemaLink = document.createElement("a");

        const sliderNavLink = document.createElement("a");

        imgPoster.src = cinema.image;
        imgPoster.alt = cinema.title;
        imgPoster.id = `featured_cinema_${counter}`;
        cinemaLink.href = `cinema.html?title=${cinema.title}`;
        cinemaLink.appendChild(imgPoster);
        featuredSlider.appendChild(cinemaLink);

        sliderNavLink.href = `#featured_cinema_${counter}`;
        counter++;
        sliderNav.appendChild(sliderNavLink);
    });
}

window.addEventListener("load", (event1) => {
    
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenType = typeParams.get("type");
    
    const header = document.getElementById("index_header");

    if (chosenType=="cinemas"){
        header.textContent="Cinémas";
        showFeaturedCinema(featuredCinema);
        fetchAllCinema();
    }else{
        header.textContent="Films";
        showFeaturedFilm(featuredFilm);
        fetchAllFilm();
    }
});


async function fetchAllCinema(){
    const responseCinema = await fetch("http://localhost/api/cinemas");
    const content = await responseCinema.json();
    
    showCinemas(content);

}

async function fetchAllFilm(){
    const responseFilm = await fetch("http://localhost/api/films");
    const contenu = await responseFilm.json();
    
    showFilms(contenu);

}