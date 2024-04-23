window.addEventListener("load", (event1) => {
    const btnTabAjoutFilm = document.querySelector("#tab_ajouter_film");
    const btnTabModifFilm = document.querySelector("#tab_modifier_film");
    const btnTabModifCinema = document.querySelector("#tab_modifier_cinema");
  
    const tabAjouterFilm = document.querySelector("#ajouter_film");
    const tabModifierFilm = document.querySelector("#modifier_film");
    const tabModifierCinema = document.querySelector("#modifier_cinema");
  
      const perms = cookieGetter("privilege");
      const sbutton = document.querySelector("#film_ajout");
      const ubutton = document.querySelector("#film_update");
      const dbutton = document.querySelector("#film_delete");
      const cinemaUpdate = document.querySelector("#cinema_update");
      console.log(perms);
      if (perms === "admin") {
          sbutton.addEventListener("click", (event3) => {
              const info_film = {
                  nom_film: document.querySelector("#creer_nom_film").value,
                  image: document.querySelector("#creer_image_film").value,
                  image_banniere: document.querySelector("#creer_image_banniere").value,
                  description: document.querySelector("#creer_description").value,
                  genre_principal: document.querySelector("#creer_genre_principal").value,
                  genre_secondaire: document.querySelector("#creer_genre_secondaire").value,
                  annee: document.querySelector("#creer_annee").value,
                  duree: document.querySelector("#creer_duree").value,
                  realisateur: document.querySelector("#creer_realisateur").value,
                  acteur_principal: document.querySelector("#creer_acteur_principal").value,
                  acteur_secondaire: document.querySelector("#creer_acteur_secondaire").value,
              };
  
        let check = true;
        Object.keys(info_film).forEach((element) => {
          if (info_film[element] === "") check = false;
        });
        check
          ? ajouterNouveauFilm(info_film)
          : alert("Veuillez entrer toutes les informations du compte");
      });
  
          ubutton.addEventListener("click", (event4) => {
              const id_film = new URLSearchParams(window.location.search).get("filmId");
              const info_film = {
                  id: id_film,
                  nom_film: document.querySelector("#update_nom_film").value,
                  image: document.querySelector("#update_image_film").value,
                  image_banniere: document.querySelector("#update_image_banniere").value,
                  description: document.querySelector("#update_description").value,
                  genre_principal: document.querySelector("#update_genre_principal").value,
                  genre_secondaire: document.querySelector("#update_genre_secondaire").value,
                  annee: document.querySelector("#update_annee").value,
                  duree: document.querySelector("#update_duree").value,
                  realisateur: document.querySelector("#update_realisateur").value,
                  acteur_principal: document.querySelector("#update_acteur_principal").value,
                  acteur_secondaire: document.querySelector("#update_acteur_secondaire").value,
              };
              let check = true;
              Object.keys(info_film).forEach(element => {
                  if (info_film[element] == "") check = false;
              });
              check ? updateFilm(info_film) : alert("Veuillez entrer toutes les informations du film");
          });
          dbutton.addEventListener("click", (event5) => {
              if (confirm("Voulez-vous vraiment supprimer ce film?")) {
                  const id_film = new URLSearchParams(window.location.search).get("filmId");
                  deleteFilm(id_film);
              }
          });
          fetchListeFilms();
          cinemaUpdate.addEventListener("click", (event6) => {
              const id_cinema = new URLSearchParams(window.location.search).get("cinemaId");
              const info_cinema = {
                  id: id_cinema,
                  nom_cinema: document.querySelector("#update_nom_cinema").value,
                  image: document.querySelector("#update_image_cinema").value,
                  emplacement: document.querySelector("#update_emplacement_cinema").value,
              };
              let check = true;
              Object.keys(info_cinema).forEach(element => {
                  if (info_cinema[element] === "") check = false;
              });
              check ? updateCinema(info_cinema) : alert("Veuillez entrer toutes les informations du cinema");
          });
          fetchListeCinema();
          btnTabAjoutFilm.addEventListener("click", (event) => {
              tabAjouterFilm.style.display = "block";
              tabModifierFilm.style.display = "none";
              tabModifierCinema.style.display = "none";
              btnTabAjoutFilm.classList.add("active");
              btnTabModifFilm.classList.remove("active");
              btnTabModifCinema.classList.remove("active");
          });
          btnTabModifFilm.addEventListener("click", (event) => {
              tabAjouterFilm.style.display = "none";
              tabModifierFilm.style.display = "block";
              tabModifierCinema.style.display = "none";
              btnTabAjoutFilm.classList.remove("active");
              btnTabModifFilm.classList.add("active");
              btnTabModifCinema.classList.remove("active");
          });
          btnTabModifCinema.addEventListener("click", (event) => {
              tabAjouterFilm.style.display = "none";
              tabModifierFilm.style.display = "none";
              tabModifierCinema.style.display = "block";
              btnTabAjoutFilm.classList.remove("active");
              btnTabModifFilm.classList.remove("active");
              btnTabModifCinema.classList.add("active");
          });
      } else {
          document.querySelector("#div_admin").style.display = "none";
          const divPasAdmin = document.querySelector("#div_pas_admin_erreur")
          divPasAdmin.appendChild(document.createElement('p')).appendChild(document.createTextNode('Vous n\'avez pas les droits pour accéder à cette page.'));
          let link = document.createElement("a");
          link.href = "index.html";
          link.appendChild(document.createTextNode("Retourner à l'accueil"));
          divPasAdmin.appendChild(link);
      }
  });
  
  async function ajouterNouveauFilm(film) {
      const filmList = await fetch("http://localhost/api/films")
      const response = await filmList.json();
      let check = true;
      response.forEach(element => {
          if (element.nom_film.toLowerCase().replace(/\s/g, '') === film.nom_film.toLowerCase().replace(/\s/g, '')) check = false;
      });
      if (check) {
          const filmResponse = await fetch("http://localhost/api/films/ajout", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(film),
          });
          const content = await filmResponse.json();
          console.log(content);
          if (content.erreur) {
              alert(content.erreur);
          } else {
              alert("Le film a été ajouté avec succès");
          }
      }
      else {
          alert("Ce film existe déjà");
      }
  }
  
  async function fetchListeFilms() {
    const filmResponse = await fetch("http://localhost/api/films");
    const content = await filmResponse.json();
    afficherListeFilm(content);
    if (content.erreur) {
      alert(content.erreur);
    }
  }
  
  function afficherListeFilm(films) {
    const itemList = document.querySelector("#liste_films");
    films.forEach((element) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "javascript:void(0)";
      link.addEventListener("click", (event) => {
        fetchFilm(element.id);
        window.history.pushState(null, null, "admin.html?filmId=" + element.id);
      });
      link.appendChild(document.createTextNode(element.nom_film));
      item.appendChild(link);
      itemList.appendChild(item);
    });
  }
  
  async function fetchFilm(id) {
    const filmResponse = await fetch(`http://localhost/api/films/filmid/${id}`);
    const film = await filmResponse.json();
    updateFormFilm(film);
    if (film.erreur) {
      alert(film.erreur);
    }
  }
  
  function updateFormFilm(film) {
    document.getElementById("update_nom_film").value = film.nom_film;
    document.getElementById("update_image_film").value = film.image;
    document.getElementById("update_image_banniere").value = film.image_banniere;
    document.getElementById("update_description").value = film.description;
    document.getElementById("update_genre_principal").value =
      film.genre_principal;
    document.getElementById("update_genre_secondaire").value =
      film.genre_secondaire;
    document.getElementById("update_annee").value = film.annee;
    document.getElementById("update_duree").value = film.duree;
    document.getElementById("update_realisateur").value = film.realisateur;
    document.getElementById("update_acteur_principal").value =
      film.acteur_principal;
    document.getElementById("update_acteur_secondaire").value =
      film.acteur_secondaire;
  }
  
  async function updateFilm(film) {
    const filmResponse = await fetch(`http://localhost/api/films/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
    const content = await filmResponse.json();
    console.log(content);
    if (content.erreur) {
      alert(content.erreur);
    } else {
      alert("Le film a été mis à jour avec succès");
    }
  }
  
  async function deleteFilm(film_id) {
    const filmResponse = await fetch(
      `http://localhost/api/films/delete/${film_id}`,
      {
        method: "DELETE",
      }
    );
    const content = await filmResponse.json();
    console.log(content);
    if (content.erreur) {
      alert(content.erreur);
    } else {
      alert("Le film a été supprimé avec succès");
    }
  }
  
  async function fetchListeCinema() {
    const cinemaResponse = await fetch("http://localhost/api/cinemas");
    const content = await cinemaResponse.json();
    afficherListeCinema(content);
    if (content.erreur) {
      alert(content.erreur);
    }
  }
  
  function afficherListeCinema(cinemas) {
    const itemList = document.querySelector("#liste_cinemas");
    cinemas.forEach((element) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "javascript:void(0)";
      link.addEventListener("click", (event) => {
        fetchCinema(element.id);
        window.history.pushState(null, null, "admin.html?cinemaId=" + element.id);
      });
      link.appendChild(document.createTextNode(element.nom_cinema));
      item.appendChild(link);
      itemList.appendChild(item);
    });
  }
  
  async function fetchCinema(id) {
    const cinemaResponse = await fetch(`http://localhost/api/cinemas/${id}`);
    const cinema = await cinemaResponse.json();
    console.log(cinema);
    updateFormCinema(cinema);
    if (cinema.erreur) {
      alert(cinema.erreur);
    }
  }
  
  function updateFormCinema(cinema) {
    document.getElementById("update_nom_cinema").value = cinema.nom_cinema;
    document.getElementById("update_image_cinema").value = cinema.image;
    document.getElementById("update_emplacement_cinema").value =
      cinema.emplacement;
  }
  
  async function updateCinema(cinema) {
    const cinemaResponse = await fetch(`http://localhost/api/cinemas/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cinema),
    });
    const content = await cinemaResponse.json();
    console.log(content);
    if (content.erreur) {
      alert(content.erreur);
    } else {
      alert("Le cinema a été mis à jour avec succès");
    }
  }
  
  function cookieGetter(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return false;
  }
  