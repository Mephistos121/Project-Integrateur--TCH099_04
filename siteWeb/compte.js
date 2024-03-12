window.addEventListener("load", (event1) => {
    let rbutton = document.querySelector("#compte_acceuil");

    rbutton.addEventListener("click", (event2) => {
        confirm("Veux-tu revenir a la page d'acceuil?") ? window.location = "accueil.html": false;
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

async function ajouterNouveauCompte(compte){
    const response = await fetch("http://localhost/api/comptes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compte),
    });
    if (response.ok){
        let success = document.querySelector("#edit_success");
        success.textContent="Compte ajouter!";
        document.querySelector("#creer_form").reset();
    }else {
        alert("Le serveur a refuser");
    }
}