let movies = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

let featuredMovie = [{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/1000x400" }];

const movieList = document.getElementById("movie_list");
const featuredMovieList = document.getElementById("featured_movie_list");

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

        movieLink.href = "";
        movieLink.appendChild(imgPoster);
        movieLink.appendChild(movieTitle);
        movieListItem.appendChild(movieLink);
        movieList.appendChild(movieListItem);
    });
}

function showFeaturedMovie(movie) {
    movie.forEach(movie => {
        const featuredMovieListItem = document.createElement("li");
        const imgPoster = document.createElement("img");
        const movieLink = document.createElement("a");

        imgPoster.src = movie.image;
        imgPoster.alt = movie.title;

        movieLink.href = "";
        movieLink.appendChild(imgPoster);
        featuredMovieListItem.appendChild(movieLink);
        featuredMovieList.appendChild(featuredMovieListItem);
    });
}

