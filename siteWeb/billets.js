let positionglobale;
let myposition;

window.addEventListener("load", (event1) => {
  getPosition();
  let filmid = new URLSearchParams(window.location.search).get("id");
  fetchCinema(filmid);
});

function afficherListeCinema(liste) {
  const listeC = document.getElementById("liste_cinema");
  const listeR = document.getElementById("liste_representation");
  liste.forEach((cinema) => {
    const newCinema = document.createElement("p");
    newCinema.textContent = cinema.nom_cinema + " " + cinema.emplacement;
    const newRepresentation = document.createElement("p");
    newRepresentation.textContent = cinema.temps;
    newRepresentation.addEventListener("click", () => {
      fetchSalle(cinema.id);
    });
    listeC.append(newCinema);
    listeR.append(newRepresentation);
  });
}

async function validationAdresse(adresse) {
  const response = await fetch(
    "https://api.geoapify.com/v1/geocode/search?text=" +
      adresse +
      " &format=json&apiKey=2afe72c7eb67429697a93b09ac956772"
  );
  const content2 = await response.json();
  if (content2.results.length == 0) {
    alert("adresse non valide");

    return false;
  }
  const position2 = {
    latitude: content2.results[0].lat,
    longitude: content2.results[0].lon,
  };
  return position2;
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function distanceCheck(position2) {
  if (position2 !== null) {
    const lon1 = Math.abs(myposition.coords.longitude) * (Math.PI / 180);
    const lat1 = Math.abs(myposition.coords.latitude) * (Math.PI / 180);
    const lon2 = Math.abs(position2.longitude) * (Math.PI / 180);
    const lat2 = Math.abs(position2.latitude) * (Math.PI / 180);

    const shenanigan =
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    distance = Math.acos(shenanigan) * 6371;
  } else {
    distance = 999999;
  }
  return distance;
}

function success(position) {
  myposition = position;
}

function error() {
  console.log("unable to locate");
  myposition = null;
}

async function triAddresse(liste) {
  for (const cinema of liste) {
    let adresse = cinema.emplacement;

    let position2 = await validationAdresse(adresse);

    cinema["distance"] = distanceCheck(position2);
  }

  liste.sort(compareCinema);
  afficherListeCinema(liste);
}

function compareCinema(a, b) {
  if (a.distance > b.distance) {
    return 1;
  } else if (a.distance < b.distance) {
    return -1;
  }
  return 0;
}

function afficherListePlace(billets, liste, cout, repid) {
  const listeP = document.getElementById("liste_place");
  while (listeP.firstChild) {
    listeP.removeChild(listeP.lastChild);
  }
  liste.forEach((siege) => {
    let check = true;
    billets.forEach((billet) => {
      if (billet.place === siege) {
        check = false;
      }
    });
    if (check) {
      let newPlace = document.createElement("a");
      newPlace.textContent = siege + " ";
      newPlace.href = "payer.html?place=" + siege + "&id=" + repid;
      listeP.append(newPlace);
    }
  });
  const prix = document.getElementById("cout_siege");
  prix.textContent = cout + "$";
}

async function fetchCinema(filmid) {
  const responseCinemas = await fetch(
    "http://localhost/api/cinemas/film/" + filmid
  );
  const liste = await responseCinemas.json();

  triAddresse(liste);
}

async function fetchSalle(repid) {
  const responseFilm = await fetch(
    "http://localhost/api/salle/representation/" + repid
  );
  const salle = await responseFilm.json();
  const liste = salle.sieges.split(",");
  fetchBillets(liste, salle.cout, repid);
}

async function fetchBillets(liste, cout, repid) {
  const responseBillets = await fetch(
    "http://localhost/api/billets/represention/" + repid
  );
  console.log(repid);
  const billets = await responseBillets.json();
  afficherListePlace(billets, liste, cout, repid);
}
