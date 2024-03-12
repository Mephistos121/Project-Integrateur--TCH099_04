let movies = [{ title: "Lorem ipsum", image: "https://placehold.co/300x400" },
        { title: "Lorem ipsum", image: "https://placehold.co/300x400" },
        { title: "Lorem ipsum", image: "https://placehold.co/300x400" },
        { title: "Lorem ipsum", image: "https://placehold.co/300x400" }];

const movieList = document.getElementById("movie_list");

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

        movieLink.appendChild(movieTitle);
        movieLink.href = "";

        movieLink.appendChild(imgPoster);
        movieListItem.appendChild(movieLink);
        movieList.appendChild(movieListItem);
    });
}