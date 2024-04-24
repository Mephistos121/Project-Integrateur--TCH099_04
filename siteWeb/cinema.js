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

        filmLink.href =`film.html?id=${film.id}`;
        filmLink.appendChild(imgPoster);
        filmLink.appendChild(filmTitle);
        filmListItem.appendChild(filmLink);
        list.appendChild(filmListItem);
    });
}

window.addEventListener("load", (event1) => {
    
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenCinemaId = typeParams.get("id");
    
    putCinemaName(chosenCinemaId);
    fetchAllFilm(chosenCinemaId);

    cacherMenuConnexion();
    cacherMenuCompte();
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
function getconnecterCookie() {
    const cookieArray = document.cookie.split("; ");
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split("=");
      if (name === "id") {
        return value;
      }
    }
  }

function isConnected() {
    const connecterValue = getconnecterCookie();
    return connecterValue != null;
  }
  
  function cacherMenuConnexion() {
    let menuConnexion = document.querySelector("#account_link");
    if (isConnected()) {
      menuConnexion.style.display = "none";
    } else {
      menuConnexion.style.display = "block";
    }
  }
  
  function cacherMenuCompte() {
    let menuCompte = document.querySelector("#account_info");
    if (isConnected()) {
      menuCompte.style.display = "block";
    } else {
      menuCompte.style.display = "none";
    }
  }