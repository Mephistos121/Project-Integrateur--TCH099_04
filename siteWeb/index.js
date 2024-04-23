let featuredFilm = [
    {
      title: "1",
      image:
        "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/08/beemovie-topintro-copy.jpg",
    },
    {
      title: "48",
      image:
        "https://news.tfw2005.com/wp-content/uploads/sites/10/2023/04/ROTB-Promotional-poster-01-1278x665.jpg",
    },
    {
      title: "52",
      image:
        "https://i.pinimg.com/736x/e1/d2/25/e1d225782ae0adf9f4b09839d43d2b5f.jpg",
    },
  ];
  
  const list = document.getElementById("index_list");
  const featuredSlider = document.getElementById("featured_index_slider");
  const featuredContainer = document.getElementById("featured_index_container");
  const sliderNav = document.getElementById("slider_nav");
  
  function showFilms(films) {
    films.forEach((film) => {
      const filmListItem = document.createElement("li");
      const imgPoster = document.createElement("img");
      const filmTitle = document.createElement("p");
      const filmLink = document.createElement("a");
  
      imgPoster.src = film.image;
      imgPoster.alt = film.nom_film;
      filmTitle.textContent = film.nom_film;
  
      filmLink.href = `film.html?id=${film.id}`;
      filmLink.appendChild(imgPoster);
      filmLink.appendChild(filmTitle);
      filmListItem.appendChild(filmLink);
      list.appendChild(filmListItem);
    });
  }
  
  function showFeaturedFilm(film) {
    let counter = 0;
    film.forEach((film) => {
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
    cinemas.forEach((cinema) => {
      const cinemaListItem = document.createElement("li");
      const imgPoster = document.createElement("img");
      const cinemaTitle = document.createElement("p");
      const cinemaLink = document.createElement("a");
  
      imgPoster.src = cinema.image;
      imgPoster.alt = cinema.nom_cinema;
      cinemaTitle.textContent = cinema.nom_cinema;
  
      cinemaLink.href = `cinema.html?id=${cinema.id}`;
      cinemaLink.appendChild(imgPoster);
      cinemaLink.appendChild(cinemaTitle);
      cinemaListItem.appendChild(cinemaLink);
      list.appendChild(cinemaListItem);
    });
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
  
  window.addEventListener("load", (event1) => {
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const chosenType = typeParams.get("type");
  
    const header = document.getElementById("index_header");
  
    if (chosenType == "cinemas") {
      header.textContent = "Cinémas";
      rechercher();
      fetchAllCinema();
    } else {
      header.textContent = "Films";
      showFeaturedFilm(featuredFilm);
      rechercher();
      fetchAllFilm();
    }
  
    cacherMenuConnexion();
    cacherMenuCompte();
  });
  function rechercher() {
    const rechercheParFilm = document.getElementById("recherche_film");
    rechercheParFilm.addEventListener("keyup", () => {
      let input, filter, ul, li, p, i, txtValue;
      input = document.getElementById("recherche_film");
      filter = input.value.toUpperCase();
      ul = document.getElementById("index_list");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("a")[0].getElementsByTagName("p")[0];
        if (p) {
          txtValue = p.textContent || p.innerText;
  
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
          } else {
            li[i].style.display = "none";
          }
        }
      }
    });
  }
  
  async function fetchAllCinema() {
    const responseCinema = await fetch("https://equipe500.tch099.ovh/projet4/api/cinemas");
    const content = await responseCinema.json();
  
    showCinemas(content);
  }
  
  async function fetchAllFilm() {
    const responseFilm = await fetch("https://equipe500.tch099.ovh/projet4/api/films");
    const contenu = await responseFilm.json();
  
    showFilms(contenu);
  }
  