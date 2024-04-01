window.addEventListener("load", (event1) => {

   
    afficherInfos();

    
    let sbutton = document.querySelector("#payer_submit");

    sbutton.addEventListener("click", (event3) => {
        const info_paiement = {num_carte: document.querySelector("#num_carte").value,
        carte_date: document.querySelector("#carte_date").value,
        carte_code: document.querySelector("#carte_code").value,
        paiement_nom: document.querySelector("#paiement_nom").value,
        paiement_prenom: document.querySelector("#paiement_prenom").value,
        paiement_addresse: document.querySelector("#paiement_addresse").value,
        paiement_ville: document.querySelector("#paiement_ville").value,
        paiement_pays: document.querySelector("#paiement_pays").value,
        paiement_code_postal: document.querySelector("#paiement_code_postal").value,
        paiement_num_tel: document.querySelector("#paiement_num_tel").value
        };
        let check=true;
        Object.keys(info_paiement).forEach(element => {
            if (info_paiement[element]==="") check=false;
        });

        if (check && info_paiement.num_carte.length!==9 && info_paiement.carte_code.length!==3 && info_paiement.paiement_num_tel.length!==10){
            check = false;
        }

        check ? ajouterBillet() : alert("Veuillez remplir adequatement tous les champs.");
    });
    

});

function ajouterBillet(){
    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const siege = typeParams.get("place");
    const repid = typeParams.get("id");
    const usid = cookieGetter("id");
    const info_billet = {place: siege, representation_id: repid, usager_id: usid};

    ajouterBDBillet(info_billet);
}

function cookieGetter(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if(cookieName === name){
            return cookieValue;
        }
    }
    return false;
}

async function ajouterBDBillet(billet){
    const response = await fetch("http://localhost/api/billets/ajout", {
            method: 'POST',
            
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(billet),
        });
    const message = await response.json();
    if(message){
        alert("Success")
    }else {
        alert("Le serveur a refusé");
    }
    
}

async function afficherInfos(){

    const myKeyValues = window.location.search;
    const typeParams = new URLSearchParams(myKeyValues);
    const siege = typeParams.get("place");
    const repid = typeParams.get("id");

    const responseFilm = await fetch("http://localhost/api/representation/"+repid);
    const salle = await responseFilm.json();
    

    const place = document.getElementById("billet_place");
    const nom_film = document.getElementById("billet_nom_film");
    const nom_cinema = document.getElementById("billet_nom_cinema");
    const emplacement = document.getElementById("billet_emplacement");
    const num_salle = document.getElementById("billet_num_salle");
    const cout = document.getElementById("billet_cout");

    place.textContent = "Place : "+ siege;
    nom_film.textContent = "Nom du film : " + salle.nom_film;
    nom_cinema.textContent = "Nom du cinema : " +salle.nom_cinema;
    emplacement.textContent = "Emplacement : " + salle.emplacement;
    num_salle.textContent = "Numero de salle : " + salle.salle_id;
    cout.textContent = "Cout du billet : " + salle.cout + "$";

}