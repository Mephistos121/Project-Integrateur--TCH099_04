window.addEventListener("load", (event1) => {
    const representation_gestion_button = document.getElementById(
      "ajout_representation_button"
    );
    const cinema_ajout_button = document.getElementById("ajout_cinema_button");
    const film_ajout_button = document.getElementById("ajout_film_button");
    const representationAjoutSection = document.getElementById(
      "ajout_representation_section"
    );
    const cinemaAjoutSection = document.getElementById("ajout_cinema_section");
    const filmAjoutSection = document.getElementById("ajout_film_section");
    const datePicker = document.getElementById("creer_rep_date");
    datePicker.min = new Date().getDate();
    showDiv(representationAjoutSection);
    closeDiv(cinemaAjoutSection);
    closeDiv(filmAjoutSection);
    let ajoutCinema = document.querySelector("#creer_submit");
    let gestionnaireId = cookieGetter("id");
    cinemaGetter(gestionnaireId);
    filmGetter(gestionnaireId);
    
    if (gestionnaireId === false) {
      console.log("Erreur pas de ID");
    }
    ajoutCinema.addEventListener("click", (event2) => {
      const info_cinema = {
        nom: document.querySelector("#creer_nom").value,
        image: document.querySelector("#creer_image").value,
        emplacement: document.querySelector("#creer_emplacement").value,
        gestionnaire: gestionnaireId,
      };
  
      let check = true;
      Object.keys(info_cinema).forEach((element) => {
        if (info_cinema[element] === "") check = false;
      });
      check
        ? ajouterNouveauCinema(info_cinema)
        : actionReussi("veuillez entrer toutes les informations du cinéma");
    });
    representation_gestion_button.addEventListener("click", () => {
      const representationAjoutSection = document.getElementById(
        "ajout_representation_section"
      );
      const cinemaAjoutSection = document.getElementById("ajout_cinema_section");
      const filmAjoutSection = document.getElementById("ajout_film_section");
      showDiv(representationAjoutSection);
      closeDiv(cinemaAjoutSection);
      closeDiv(filmAjoutSection);
    });
    cinema_ajout_button.addEventListener("click", () => {
      const representationAjoutSection = document.getElementById(
        "ajout_representation_section"
      );
      const cinemaAjoutSection = document.getElementById("ajout_cinema_section");
      const filmAjoutSection = document.getElementById("ajout_film_section");
      closeDiv(representationAjoutSection);
      showDiv(cinemaAjoutSection);
      closeDiv(filmAjoutSection);
    });
    film_ajout_button.addEventListener("click", () => {
      const representationAjoutSection = document.getElementById(
        "ajout_representation_section"
      );
      const cinemaAjoutSection = document.getElementById("ajout_cinema_section");
      const filmAjoutSection = document.getElementById("ajout_film_section");
      closeDiv(representationAjoutSection);
      closeDiv(cinemaAjoutSection);
      showDiv(filmAjoutSection);
    });
    const rechercheParCinema = document.getElementById("recherche_cinema");
    rechercheParCinema.addEventListener("keyup", () => {
      let input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("recherche_cinema");
      filter = input.value.toUpperCase();
      table = document.getElementById("table_cinema");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
    const rechercheParFilm = document.getElementById("recherche_film");
    rechercheParFilm.addEventListener("keyup", () => {
      let input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("recherche_film");
      filter = input.value.toUpperCase();
      table = document.getElementById("table_film");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
    tableCinemaBuilder(gestionnaireId);
    tableFilmBuilder(gestionnaireId);
  
    const ajout_representation = document.getElementById("creer_rep_submit");
    ajout_representation.addEventListener("click", () => {
      console.log(document.querySelector("#creer_rep_date"));
      const info_representation = {
        nom: document.querySelector("#creer_rep_film").value,
        cinema: document.querySelector("#creer_rep_cinema").value,
        date: document.querySelector("#creer_rep_date").value,
        numero: document.querySelector("#creer_rep_salle").value,
        cout: document.querySelector("#creer_rep_cout").value,
      };
      ajouterNouvelleRepresentation(info_representation);
    });
  });
  async function ajouterNouvelleRepresentation(rep) {
    const response = await fetch("https://equipe500.tch099.ovh/projet4/api/representation", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rep),
    });
    const message = await response.json();
    if (response.ok) {
      let reponse = JSON.stringify(message).split(":");
      reponse[0] = reponse[0].replace('"', "").trim();
      reponse[1] = reponse[1].replace('"', "").trim();
      if (reponse[0].localeCompare("Erreur") == 0) {
        actionReussi("Erreur dans l'ajout de la représentation");
      } else {
        actionReussi("Représentation ajouté");
      }
    } else {
      actionReussi("Le serveur a refusé");
    }
  }
  async function ajouterNouveauCinema(cinema) {
    //validation du nom de cinema
    const responseCinema = await fetch("https://equipe500.tch099.ovh/projet4/api/cinemas");
    const content = await responseCinema.json();
    let ajoutValide = true;
    if (content.length) {
      Object.keys(content).forEach((element) => {
        //console.log("Comparaison entre: "+content[element].nom_cinema +" et "+ cinema.nom);
        if (content[element].nom_cinema == cinema.nom) {
          actionReussi("Ce nom de cinéma est déjà utilisé");
          ajoutValide = false;
          //console.log(content[element] + " " + cinema.nom);
        }
      });
    }
    //validation adresse avec geoapify
    ajoutValide = validationAdresse(cinema.emplacement);
  
    //validation droit d'ajout
    if (cookieGetter("privilege") != "gestionnaire") {
      alert("Vous devez être un gestionnaire pour ajouter des cinémas");
    }
  
    //si tout est beau on ajoute
    else if (ajoutValide) {
      const response = await fetch("https://equipe500.tch099.ovh/projet4/api/demande/cinema", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cinema),
      });
      const message = await response.json();
      console.log(message);
      if (message.erreur) {
        alert(message.erreur);
      } else if (response.ok) {
        actionReussi("Demande de cinéma enregistrer");
        gestionnaireId = cookieGetter("id");
        console.log(gestionnaireId);
        cinemaGetter(gestionnaireId);
      } else {
        actionReussi("Le serveur a refusé");
      }
    }
  }
  
  function showDiv(section) {
    section.style.display = "flex";
  }
  
  function closeDiv(section) {
    section.style.display = "none";
  }
  
  const ajoutFilm = document.getElementById("creer_film_submit");
  
  ajoutFilm.addEventListener("click", (event2) => {
    let gestionnaireId = cookieGetter("id");
  
    const info_film = {
      nom_film: document.getElementById("creer_nom_film").value,
      image: document.getElementById("creer_image_film").value,
      image_banniere: document.getElementById("creer_image_banniere").value,
      description: document.getElementById("creer_description").value,
      genre_principal: document.getElementById("creer_genre_principal").value,
      genre_secondaire: document.getElementById("creer_genre_secondaire").value,
      annee: document.getElementById("creer_annee").value,
      duree: document.getElementById("creer_duree").value,
      realisateur: document.getElementById("creer_realisateur").value,
      acteur_principal: document.getElementById("creer_acteur_principal").value,
      acteur_secondaire: document.getElementById("creer_acteur_secondaire").value,
      id_usager: gestionnaireId,
    };
    let check = true;
    Object.keys(info_film).forEach((element) => {
      if (info_film[element] === "") check = false;
    });
    check
      ? ajouterNouveauFilm(info_film)
      : actionReussi("Veuillez entrez toutes les informations du film");
  });
  
  async function ajouterNouveauFilm(film) {
    if (cookieGetter("privilege") != "gestionnaire") {
      alert("Vous devez être un gestionnaire pour ajouter des films");
    }
    const response = await fetch("https://equipe500.tch099.ovh/projet4/api/demande/ajout/film", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(film),
    });
    const message = await response.json();
    console.log(message);
    if (message.erreur) {
      alert(message.erreur);
    } else if (response.ok) {
      actionReussi("Film ajouté avec succès");
      filmGetter(gestionnaireId);
    } else {
      actionReussi("Le serveur a refusé");
    }
  }
  
  async function validationAdresse(adresse) {
    const response = await fetch(
      "https://api.geoapify.com/v1/geocode/search?text=" +
        adresse +
        " &format=json&apiKey=c79307b333d645cfba222d71ad09c686"
    );
    const content2 = await response.json();
    console.log(content2);
    if (content2.results.length == 0) {
      actionReussi("Adresse invalide");
      return false;
    }
    return true;
  }
  async function cinemaGetter(id) {
    const responseCinema = await fetch(
      "https://equipe500.tch099.ovh/projet4/api/cinemas/gestionnaire/" + id
    );
    const content = await responseCinema.json();
    const responseCinemaDemande = await fetch(
      "https://equipe500.tch099.ovh/projet4/api/demande/ajout/cinema/gestionnaire/" + id
    );
    const contentDemande = await responseCinemaDemande.json();
    if (content.length > 0) {
      const divList = document.querySelector("div#liste_cinema > div");
      divList.textContent = "";
      const ul = document.createElement("ul");
      divList.append(ul);
      const deleteContainer = document.createElement("div");
      deleteContainer.display = "flex";
      const input = document.createElement("input");
      input.type = "text";
      input.disabled = true;
      input.id = "cinema";
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        retirerCinema();
      });
      button.textContent = "Retirer";
      divList.append(deleteContainer);
      deleteContainer.append(input);
      deleteContainer.append(button);
      for (let cinema of content) {
        const li = document.createElement("li");
        li.addEventListener("click", () => {
          const click = li.querySelector("div");
          console.log(click);
          input.value = click.textContent;
        });
        const div = document.createElement("div");
        div.textContent = cinema.nom_cinema;
        const div2 = document.createElement("div");
        div2.textContent = cinema.emplacement;
  
        ul.append(li);
        li.append(div);
        li.append(div2);
      }
    }
    else{
      const divList = document.querySelector("div#liste_cinema > div");
      divList.innerText = "Aucun cinéma";
    }
  
    if (contentDemande.length > 0) {
      const divList = document.querySelector("div#liste_cinema_demande > div");
      divList.textContent = "";
      const ul = document.createElement("ul");
      divList.append(ul);
      const deleteContainer = document.createElement("div");
      deleteContainer.display = "flex";
      const input = document.createElement("input");
      input.type = "text";
      input.disabled = true;
      input.id = "cinema2";
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        retirerDemandeCinema();
      });
      button.textContent = "Retirer";
      divList.append(deleteContainer);
      deleteContainer.append(input);
      deleteContainer.append(button);
      for (let cinema of contentDemande) {
        const li = document.createElement("li");
        li.addEventListener("click", () => {
          const click = li.querySelector("div");
          console.log(click);
          input.value = click.textContent;
        });
        const div = document.createElement("div");
        div.textContent = cinema.nom_cinema;
        const div2 = document.createElement("div");
        div2.textContent = cinema.emplacement;
  
        ul.append(li);
        li.append(div);
        li.append(div2);
      }
    }
    else{
      const divList = document.querySelector("div#liste_cinema_demande > div");
      divList.innerText = "Aucun cinéma";
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
  async function retirerCinema() {
    const input = document.querySelector("#cinema");
    const gestionnaireId = cookieGetter("id");
    const retirer = [{ id: gestionnaireId }, { name: input.value }];
    console.log(retirer);
    if (input.value != "") {
      const response = await fetch(
        "https://equipe500.tch099.ovh/projet4/api/gestionnaire/cinema/delete",
        {
          method: "DELETE",
  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retirer),
        }
      );
      const message = await response.json();
      console.log(message);
      if (message.erreur) {
        alert(message.erreur);
      } else if (response.ok) {
        cinemaGetter(gestionnaireId);
      } else {
        actionReussi("Le serveur a refusé");
      }
    }
  }
  async function retirerDemandeCinema() {
    const input = document.querySelector("#cinema2");
    const gestionnaireId = cookieGetter("id");
    const retirer = [{ id: gestionnaireId }, { name: input.value }];
    console.log(retirer);
    if (input.value != "") {
      const response = await fetch(
        "https://equipe500.tch099.ovh/projet4/api/gestionnaire/cinema/demande/delete",
        {
          method: "DELETE",
  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retirer),
        }
      );
      const message = await response.json();
      console.log(message);
      if (message.erreur) {
        alert(message.erreur);
      } else if (response.ok) {
        cinemaGetter(gestionnaireId);
      } else {
        actionReussi("Le serveur a refusé");
      }
    }
  }
  
  async function filmGetter(id) {
    const responseFilm = await fetch(
      "https://equipe500.tch099.ovh/projet4/api/demande/ajout/film/gestionnaire/" + id
    );
    const content = responseFilm.json();
    if (content.length > 0) {
      const divList = document.querySelector("div#liste_film > div");
      divList.textContent = "";
      const ul = document.createElement("ul");
      divList.append(ul);
      for (let film of content) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.textContent = film.nom_film;
        const div2 = document.createElement("div");
        div2.textContent = "En attente";
  
        ul.append(li);
        li.append(div);
        li.append(div2);
      }
    }
  }
  async function tableCinemaBuilder(id) {
    const responseCinema = await fetch(
      "https://equipe500.tch099.ovh/projet4/api/cinemas/gestionnaire/" + id
    );
    const content = await responseCinema.json();
    if (content.length > 0) {
      const table = document.getElementById("table_cinema");
      for (let cinema of content) {
        const tr = document.createElement("tr");
        const td_nom = document.createElement("td");
        const td_emplacement = document.createElement("td");
        td_nom.textContent = cinema.nom_cinema;
        td_emplacement.textContent = cinema.emplacement;
  
        table.append(tr);
        tr.append(td_nom);
        tr.append(td_emplacement);
  
        td_nom.addEventListener("click", () => {
          const form_nom = document.getElementById("creer_rep_cinema");
          form_nom.value = td_nom.textContent;
        });
      }
    }
  }
  async function tableFilmBuilder(id) {
    const responseFilm = await fetch("https://equipe500.tch099.ovh/projet4/api/films");
    const content = await responseFilm.json();
    if (content.length > 0) {
      const table_film = document.getElementById("table_film");
      for (let film of content) {
        const tr = document.createElement("tr");
        const td_nom = document.createElement("td");
        const td_duree = document.createElement("td");
        td_nom.textContent = film.nom_film;
        td_duree.textContent = film.duree;
  
        table_film.append(tr);
        tr.append(td_nom);
        tr.append(td_duree);
  
        td_nom.addEventListener("click", () => {
          const form_film = document.getElementById("creer_rep_film");
          form_film.value = td_nom.textContent;
        });
      }
    }
  }
  
  function actionReussi(raison){
      const div = document.querySelector("#banniere");
      div.hidden = false;
      div.innerText = "Succès "+raison;
      setTimeout(() => {
        div.hidden = true;
      }, "5000");
  }
  
  