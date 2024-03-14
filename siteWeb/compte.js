window.addEventListener("load", (event1) => {
    let rbutton = document.querySelector("#compte_accueil");

    rbutton.addEventListener("click", (event2) => {
        confirm("Veux-tu revenir a la page d'accueil?") ? window.location = "index.html": false;
    });

    let sbutton = document.querySelector("#creer_submit");

    sbutton.addEventListener("click", (event3) => {
        
        const info_compte = {nom: document.querySelector("#creer_nom").value,
        courriel: document.querySelector("#creer_courriel").value,
        mot_passe: document.querySelector("#creer_pass").value,
        };
        
        let check=true;
        Object.keys(info_compte).forEach(element => {
            if (info_compte[element]=="") check=false;
        });
        
        check ? ajouterNouveauCompte(info_compte) : alert("Veuillez entrer toutes les informations du compte");
        
    });
});
async function uniqueEmail(compte){
    const responeMail = await fetch("http://localhost/api/comptes/"+compte.courriel);
    const content = await responeMail.json();
    return content.courriel;
}
function error(error){
    const error_div = document.querySelector("#error_code");
    console.log(error_div);
    error_div.innerHTML=error;
}
async function ajouterNouveauCompte(compte){
    const email=uniqueEmail(compte);
    if(email){
        error("Ce courriel est déjà utilisé");
    }else{
        const response = await fetch("http://localhost/api/comptes", {
            method: 'POST',
            
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(compte),
        });
        if (response.ok){
        alert("success");
        console.log(response);
        }else {
            console.log(response);
            alert("Le serveur a refuser");
        }
    }
}