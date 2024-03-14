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

const movieList = document.getElementById("movie_list");
const featuredMovieSlider = document.getElementById("featured_movie_slider");
const featuredMovieContainer = document.getElementById("featured_movie_container");
const sliderNav = document.getElementById("slider_nav");

showFeaturedMovie(featuredMovie);
showMovies(movies);

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
        movieList.appendChild(movieListItem);
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
        featuredMovieSlider.appendChild(movieLink);

        sliderNavLink.href = `#featured_movie_${counter}`;
        counter++;
        sliderNav.appendChild(sliderNavLink);
    });
}

