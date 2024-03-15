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

window.addEventListener("load", (event1) => {
    
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenType = typeParams.get("title");
    
    const header = document.getElementById("index_header");

    header.textContent="Films du cinema " + chosenType;

    if (chosenType==chosenType){
        showMovies(movies);
    }else{
        //no exit movie to do....
    }
});