let movies = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

let featuredMovie = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" }];

const list = document.getElementById("index_list");
const featuredSlider = document.getElementById("featured_index_slider");
const featuredContainer = document.getElementById("featured_index_container");
const sliderNav = document.getElementById("slider_nav");

function showMovies(movies) {
    movies.forEach(movie => {
        const movieListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const movieTitle = document.createElement("p");
        const movieLink = document.createElement("a");

        imgPoster.src = movie.image;
        imgPoster.alt = movie.title;
        movieTitle.textContent = movie.title;

        movieLink.href =`movie.html?title=${movie.title}`;
        movieLink.appendChild(imgPoster);
        movieLink.appendChild(movieTitle);
        movieListItem.appendChild(movieLink);
        list.appendChild(movieListItem);
    });
}

function showFeaturedMovie(movie) {
    let counter = 0;
    movie.forEach(movie => {
        const imgPoster = document.createElement("img");
        const movieLink = document.createElement("a");

        const sliderNavLink = document.createElement("a");

        imgPoster.src = movie.image;
        imgPoster.alt = movie.title;
        imgPoster.id = `featured_movie_${counter}`;
        movieLink.href = `movie.html?title=${movie.title}`;
        movieLink.appendChild(imgPoster);
        featuredSlider.appendChild(movieLink);

        sliderNavLink.href = `#featured_movie_${counter}`;
        counter++;
        sliderNav.appendChild(sliderNavLink);
    });
}

let cinemas = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

let featuredCinema = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" }];



function showCinemas(cinemas) {
    cinemas.forEach(cinema => {
        const cinemaListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const cinemaTitle = document.createElement("p");
        const cinemaLink = document.createElement("a");

        imgPoster.src = cinema.image;
        imgPoster.alt = cinema.title;
        cinemaTitle.textContent = cinema.title;

        cinemaLink.href =`cinema.html?title=${cinema.title}`;
        cinemaLink.appendChild(imgPoster);
        cinemaLink.appendChild(cinemaTitle);
        cinemaListItem.appendChild(cinemaLink);
        list.appendChild(cinemaListItem);
    });
}

function showFeaturedCinema(cinema) {
    let counter = 0;
    cinema.forEach(cinema => {
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
        showCinemas(cinemas);
    }else{
        header.textContent="Films";
        showFeaturedMovie(featuredMovie);
        showMovies(movies);
    }
});