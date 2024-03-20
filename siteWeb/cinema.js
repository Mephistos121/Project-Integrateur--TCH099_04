let films = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

let featuredFilm = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
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
        imgPoster.alt = film.title;
        filmTitle.textContent = film.title;

        filmLink.href =`film.html?title=${film.title}`;
        filmLink.appendChild(imgPoster);
        filmLink.appendChild(filmTitle);
        filmListItem.appendChild(filmLink);
        list.appendChild(filmListItem);
    });
}

window.addEventListener("load", (event1) => {
    
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenType = typeParams.get("title");
    
    const header = document.getElementById("index_header");

    header.textContent="Films du cinema " + chosenType;

    if (chosenType==chosenType){
        showFilms(films);
    }else{
        //no exit film to do....
    }
});