window.addEventListener("load", (event1) => {
  const btnTabDemandeFilm = document.querySelector("#film_button");
  const btnTabDemandeCinema = document.querySelector("#cinema_button");
  const perms = cookieGetter("privilege");
  if (perms == "admin") {
    btnTabDemandeFilm.addEventListener("click", (event) => {
      document.querySelector("#demande_film").style.display = "block";
      document.querySelector("#demande_cinema").style.display = "none";
      btnTabDemandeFilm.classList.add("active");
      btnTabDemandeCinema.classList.remove("active");
    });
    btnTabDemandeCinema.addEventListener("click", (event) => {
      document.querySelector("#demande_film").style.display = "none";
      document.querySelector("#demande_cinema").style.display = "block";
      btnTabDemandeFilm.classList.remove("active");
      btnTabDemandeCinema.classList.add("active");
    });
    fetchDemandesFilm();
    fetchDemandesCinema();
  } else {
    document.querySelector("#div_demande").style.display = "none";
    const divPasAdmin = document.querySelector("#div_pas_admin_erreur");
    divPasAdmin
      .appendChild(document.createElement("p"))
      .appendChild(
        document.createTextNode(
          "Vous n'avez pas les droits pour accéder à cette page."
        )
      );
    let link = document.createElement("a");
    link.href = "index.html";
    link.appendChild(document.createTextNode("Retourner à l'accueil"));
    divPasAdmin.appendChild(link);
  }
});

async function fetchDemandesFilm() {
  const response = await fetch(
    "http://localhost/api/demande/admin/ajout/films"
  );
  const content = await response.json();
  afficherDemandesFilm(content);
  if (content.erreur) {
    alert(content.erreur);
  }
}

function afficherDemandesFilm(demandes) {
  const itemList = document.getElementById("demande_film_liste");
  demandes.forEach((element) => {
    const div = document.createElement("div");
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + element.id;
    link.addEventListener("click", (event) => {
      if (
        document
          .getElementById("divInfoFilm" + element.id)
          .querySelector("#ul_opened") == null
      ) {
        fetchInfoFilm(element.id);
      } else {
        document.getElementById("ul_opened").remove();
      }
    });
    div.className = "demande_div_item";
    div.id = "divInfoFilm" + element.id;
    div.appendChild(document.createTextNode(element.nom_film));
    link.appendChild(div);
    item.appendChild(link);
    itemList.appendChild(item);
  });
}

async function fetchInfoFilm(id) {
  const response = await fetch(
    `http://localhost/api/demande/admin/ajout/film/${id}`
  );
  const content = await response.json();
  afficherInfoFilm(content);
  if (content.erreur) {
    alert(content.erreur);
  }
}

function afficherInfoFilm(info) {
  const div = document.getElementById("divInfoFilm" + info.id);
  const ul = document.createElement("ul");
  ul.id = "ul_opened";
  ul.appendChild(document.createElement("li")).textContent =
    "Nom du film: " + info.nom_film;
  ul.appendChild(document.createElement("li")).textContent =
    "Image (URL): " + info.image;
  img = document.createElement("img");
  img.src = info.image;
  ul.appendChild(document.createElement("li")).appendChild(img);
  imgBanniere = document.createElement("img");
  imgBanniere.src = info.image_banniere;
  ul.appendChild(document.createElement("li")).appendChild(imgBanniere);
  ul.appendChild(document.createElement("li")).textContent =
    "Image bannière (URL): " + info.image_banniere;
  ul.appendChild(document.createElement("li")).textContent =
    "Description: " + info.description;
  ul.appendChild(document.createElement("li")).textContent =
    "Description: " + info.description;
  ul.appendChild(document.createElement("li")).textContent =
    "Genre principal: " + info.genre_principal;
  ul.appendChild(document.createElement("li")).textContent =
    "Genre secondaire: " + info.genre_secondaire;
  ul.appendChild(document.createElement("li")).textContent =
    "Année: " + info.annee;
  ul.appendChild(document.createElement("li")).textContent =
    "Durée: " + info.duree;
  ul.appendChild(document.createElement("li")).textContent =
    "Réalisateur: " + info.realisateur;
  ul.appendChild(document.createElement("li")).textContent =
    "Acteur principal: " + info.acteur_principal;
  ul.appendChild(document.createElement("li")).textContent =
    "Acteur secondaire: " + info.acteur_secondaire;
  const abutton = document.createElement("button");
  abutton.textContent = "Accepter";
  abutton.id = "demande_film_accepter" + info.id;
  abutton.className = "form_button";
  abutton.addEventListener("click", (event) => {
    accepterDemandeFilm(info);
  });
  const rbutton = document.createElement("button");
  rbutton.textContent = "Refuser";
  rbutton.id = "demande_film_refuser" + info.id;
  rbutton.className = "form_button delete";
  rbutton.addEventListener("click", (event) => {
    enleverDemandeFilm(info);
  });
  const divButton = document.createElement("div");
  divButton.className = "bouttons_form";
  divButton.appendChild(abutton);
  divButton.appendChild(rbutton);
  ul.appendChild(divButton);
  div.appendChild(ul);
}

async function fetchDemandesCinema() {
  const response = await fetch(
    "http://localhost/api/demande/admin/ajout/cinemas"
  );
  const content = await response.json();
  afficherDemandesCinema(content);
  if (content.erreur) {
    alert(content.erreur);
  }
}

function afficherDemandesCinema(demandes) {
  const itemList = document.getElementById("demande_cinema_liste");
  demandes.forEach((element) => {
    const div = document.createElement("div");
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + element.id;
    link.addEventListener("click", (event) => {
      if (
        document
          .getElementById("divInfoCinema" + element.id)
          .querySelector("#ul_opened") == null
      ) {
        fetchInfoCinema(element.id);
      } else {
        document.getElementById("ul_opened").remove();
      }
    });
    div.className = "demande_div_item";
    div.id = "divInfoCinema" + element.id;
    div.appendChild(document.createTextNode(element.nom_cinema));
    link.appendChild(div);
    item.appendChild(link);
    itemList.appendChild(item);
  });
}

async function fetchInfoCinema(id) {
  const response = await fetch(
    `http://localhost/api/demande/admin/ajout/cinema/${id}`
  );
  const content = await response.json();
  afficherInfoCinema(content);
  if (content.erreur) {
    alert(content.erreur);
  }
}

function afficherInfoCinema(info) {
  const div = document.getElementById("divInfoCinema" + info.id);
  const ul = document.createElement("ul");
  ul.id = "ul_opened";
  ul.appendChild(document.createElement("li")).textContent =
    "Nom du cinéma: " + info.nom_cinema;
  ul.appendChild(document.createElement("li")).textContent =
    "Image (URL): " + info.image;
  img = document.createElement("img");
  img.src = info.image;
  ul.appendChild(document.createElement("li")).appendChild(img);
  ul.appendChild(document.createElement("li")).textContent =
    "Emplacement: " + info.emplacement;
  ul.appendChild(document.createElement("li")).textContent =
    "Gestionnaire: " + info.gestionnaire;
  const abutton = document.createElement("button");
  abutton.textContent = "Accepter";
  abutton.id = "demande_cinema_accepter" + info.id;
  abutton.className = "form_button";
  abutton.addEventListener("click", (event) => {
    accepterDemandeCinema(info);
  });
  const rbutton = document.createElement("button");
  rbutton.textContent = "Refuser";
  rbutton.id = "demande_cinema_refuser" + info.id;
  rbutton.className = "form_button delete";
  rbutton.addEventListener("click", (event) => {
    enleverDemandeCinema(info);
  });
  ul.appendChild(abutton);
  ul.appendChild(rbutton);
  div.appendChild(ul);
}

async function accepterDemandeFilm(info) {
  const info_film = {
    nom_film: info.nom_film,
    image: info.image,
    image_banniere: info.image_banniere,
    description: info.description,
    genre_principal: info.genre_principal,
    genre_secondaire: info.genre_secondaire,
    annee: info.annee,
    duree: info.duree,
    realisateur: info.realisateur,
    acteur_principal: info.acteur_principal,
    acteur_secondaire: info.acteur_secondaire,
  };
  const filmList = await fetch("http://localhost/api/films");
  const films = await filmList.json();
  let check = true;
  for (let film of films) {
    if (film.nom_film.toLowerCase().replace(/\s/g, '') == info_film.nom_film.toLowerCase().replace(/\s/g, '')) {
      check = false;
    }
  }

  if (check) {
    const response = await fetch(`http://localhost/api/films/ajout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info_film),
    });
    const content = await response.json();
    if (content.erreur) {
      alert(content.erreur);
      return;
    }
    else {
      enleverDemandeCinema(info);
    }
  }
}

async function enleverDemandeFilm(info) {
  const response = await fetch(
    `http://localhost/api/demande/admin/refus/film/${info.id}`,
    {
      method: "DELETE",
    }
  );
  const content = await response.json();
  if (content.erreur) {
    alert(content.erreur);
    return;
  } else {
    window.location.reload();
  }
}

async function accepterDemandeCinema(info) {
  const info_cinema = {
    nom_cinema: info.nom_cinema,
    image: info.image,
    emplacement: info.emplacement,
    gestionnaire: info.id_usager,
  };

  const cinemaList = await fetch("http://localhost/api/cinemas");
  const cinemas = await cinemaList.json();
  let check = true;
  for (let cinema of cinemas) {
    if (cinema.emplacement.toLowerCase().replace(/\s/g, '') == info_cinema.emplacement.toLowerCase().replace(/\s/g, '')) {
      check = false;
    }
  }

  if (check) {

    const response = await fetch(`http://localhost/api/cinemas/ajout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info_cinema),
    });
    const content = await response.json();
    if (content.erreur) {
      alert(content.erreur);
      return;
    } else {
      enleverDemandeCinema(info);
    }
  }else{
   actionReussi("Ce cinéma existe déjà.");
  }
}

async function enleverDemandeCinema(info) {
  const response = await fetch(
    `http://localhost/api/demande/admin/refus/cinema/${info.id}`,
    {
      method: "DELETE",
    }
  );
  const content = await response.json();
  if (content.erreur) {
    alert(content.erreur);
    return;
  } else {
    window.location.reload();
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
function actionReussi(raison){
  const div = document.querySelector("#banniere");
  div.hidden = false;
  div.innerText = raison;
  setTimeout(() => {
    div.hidden = true;
  }, "5000");
}
