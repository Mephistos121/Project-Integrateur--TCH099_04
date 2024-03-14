let movies = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
{ title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

let featuredMovie = [    { title: "Lorem ipsum", image: "https://images.unsplash.com/photo-1656464868371-602be27fd4c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" },
{ title: "Lorem ipsum", image: "https://images.unsplash.com/photo-1657586640569-4a3d4577328c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" },
{ title: "Lorem ipsum", image: "https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" }];

const movieList = document.getElementById("movie_list");
const featuredMovieSlider = document.getElementById("featured_movie_slider");
const featuredMovieContainer = document.getElementById("featured_movie_container");

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
    let counter = 0;
    movie.forEach(movie => {
        const imgPoster = document.createElement("img");
        const movieLink = document.createElement("a");

        const sliderNav = document.createElement("a");

        imgPoster.src = movie.image;
        imgPoster.alt = movie.title;
        imgPoster.id = `featured_movie_${counter}`;
        movieLink.href = "";
        movieLink.appendChild(imgPoster);
        featuredMovieSlider.appendChild(movieLink);

        sliderNav.href = `#featured_movie_${counter}`;
        counter++;
        featuredMovieContainer.appendChild(sliderNav);
    });
}

