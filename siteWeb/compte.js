window.addEventListener("load", (event1) => {

    let sbutton = document.querySelector("#creer_submit");

    sbutton.addEventListener("click", (event3) => {
        
        const info_compte = {nom: document.querySelector("#creer_nom").value,
        courriel: document.querySelector("#creer_courriel").value,
        mot_passe: document.querySelector("#creer_pass").value,
        privilege: document.querySelector("#privilege").checked,
        };
        
        let check=true;
        Object.keys(info_compte).forEach(element => {
            if (info_compte[element]==="") check=false;
        });
                check ? ajouterNouveauCompte(info_compte) : alert("Veuillez entrer toutes les informations du compte");
    });

            let connecterButton = document.querySelector("#connecterButton");

    connecterButton.addEventListener("click", (event4) => {
        const identifiant = document.querySelector("#connecter_identifiant").value;
        const motDePasse = document.querySelector("#connecter_pass").value;

        if (identifiant && motDePasse) {
            seConnecter(identifiant, motDePasse);
        } 
        else {
            alert("Veuillez remplir tous les champs.");
        }
    });
});

async function uniqueEmail(compte){
    const responeMail = await fetch("http://localhost/api/comptes/"+compte.courriel);
    const content = await responeMail.json();
    if(content.courriel!=null){
        return true;
    }
    return false;
}
function error(error){
    const error_div = document.querySelector("#error_code");
    error_div.innerHTML=error;
}


async function ajouterNouveauCompte(compte){

    uniqueEmail(compte).then(async function(results){
        console.log(results);
        if(results===true){
            error("Ce courriel est déjà utilisé");
        }
        else{
    const response = await fetch("http://localhost/api/comptes", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compte),
    });
    console.log(response);
    if (response.ok){
        alert('Success!');
        document.querySelector("#creer_form").reset();
    }else {
        alert("Le serveur a refuser");
    }
}})}

async function seConnecter(courriel, mot_passe) {
    try {
        const url = "http://localhost/api/connexion";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courriel, mot_passe }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            if(responseData===false){
                console.log("Mauvais mot de passe ou email");
            }
            else{
                const d = new Date();
                d.setTime(d.getTime()+ (24*60*60*1000));//le temps ajouté est égal à 1 jours. Multiplier par un nombre pour avoir +/- de jours
                document.cookie = "id="+responseData.id+"; expires="+d+"; path=/;";
                document.cookie = "privilege="+responseData.privilege+";expires="+d+"; path=/;"; 
            }
        } else {
            console.error('Échec de la connexion');
            alert('Échec de la connexion. Vérifiez vos identifiants.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion. Veuillez réessayer plus tard.');
    }
}

window.addEventListener("DOMContentLoaded", function() {
    cacherMenuGestionnaire();
});

function cacherMenuGestionnaire() {
    var menuGestionnaire = document.querySelector("#menu_gestionnaire");
    if (hasPrivilege()) {
        menuGestionnaire.style.display = "block"; 
    } else {
        menuGestionnaire.style.display = "none";
    }
}

function getPrivilegeCookie() {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'privilege') {
            return value;
        }
    }
    return null;
}

function hasPrivilege() {
    const privilegeValue = getPrivilegeCookie();
    return privilegeValue === "gestionnaire";
}