window.addEventListener("load", (event1) => {
    let filmid= new URLSearchParams(window.location.search).get("id");
    fetchCinema(filmid);
    
    distanceCheck();
    
});

function afficherListeCinema(liste){
    const listeC = document.getElementById("liste_cinema");
    const listeR = document.getElementById("liste_representation");
    liste.forEach(film => {
        const newCinema = document.createElement("p");
        newCinema.textContent = film.nom_cinema+" "+film.emplacement;
        const newRepresentation = document.createElement("p");
        newRepresentation.textContent = film.temps;
        newRepresentation.addEventListener("click", () => {
            fetchSalle(film.salle_id);
        });
        listeC.append(newCinema);
        listeR.append(newRepresentation);
    });

}
async function validationAdresse(adresse){
    const response = await fetch("https://api.geoapify.com/v1/geocode/search?text="+adresse+" &format=json&apiKey=2afe72c7eb67429697a93b09ac956772");
    const content2 = await response.json();
    if(content2.results.length==0){
      alert("adresse non valide");
      return false;
    }
    const position2={
        latitude:content2.results[0].lat,
        longitude:content2.results[0].lon,
    };
    return position2;
}
function distanceCheck(){
    navigator.geolocation.getCurrentPosition(success,error);
}
 async function success(position){
    const position2= await validationAdresse("1055 Boulevard des Laurentides");
    
    
    const lon1 = (Math.abs(position.coords.longitude))*(Math.PI/180);
    const lat1 = (Math.abs(position.coords.latitude))*(Math.PI/180);
    const lon2 = (Math.abs(position2.longitude))*(Math.PI/180);
    const lat2 = (Math.abs(position2.latitude))*(Math.PI/180);
    //const dlat = (Math.abs(lat2-lat1))*(Math.PI/180);
    
    

    const shenanigan = Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
    console.log(shenanigan);
    console.log(Math.acos(shenanigan)*6371);

}
function error(){
    console.log("unable to locate");
}


function afficherListePlace(liste,cout,repid){
    const listeP = document.getElementById("liste_place");
    while (listeP.firstChild) {
        listeP.removeChild(listeP.lastChild);
    }
    liste.forEach(siege => {
        const newPlace = document.createElement("a");
        newPlace.textContent = siege+" ";
        newPlace.href = "payer.html?place="+siege+"?id="+repid;
        listeP.append(newPlace);
    });
    const prix = document.getElementById("cout_siege");
    prix.textContent = cout +"$";
}


async function fetchCinema(filmid){
    const responseFilm = await fetch("http://localhost/api/cinemas/film/"+filmid);
    const liste = await responseFilm.json();
    
    afficherListeCinema(liste);
}

async function fetchSalle(repid){
    const responseFilm = await fetch("http://localhost/api/salle/representation/"+repid);
    const salle = await responseFilm.json();
    const liste = (salle.sieges).split(",");
    afficherListePlace(liste,salle.cout,repid);
}
