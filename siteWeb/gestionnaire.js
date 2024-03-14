window.addEventListener("load", (event1) => {
    let ajoutCinema = document.querySelector("#creer_submit");
    console.log(document.cookie);
    gestionnaireId=cookieGetter("id");
    cinemaGetter(gestionnaireId);
    
    if(gestionnaireId===false){
        console.log("Erreur pas de ID");
    }
    ajoutCinema.addEventListener("click", (event2) => {
        
        const info_cinema = {
        nom: document.querySelector("#creer_nom").value,
        image: document.querySelector("#creer_image").value,
        emplacement: document.querySelector("#creer_emplacement").value,
        gestionnaire: document.cookie=gestionnaireId,//PLACEHOLDER
        };
        
        let check=true;
        Object.keys(info_cinema).forEach(element => {
            if (info_cinema[element]==="") check=false;
        });
        check ? ajouterNouveauCinema(info_cinema) : alert("Veuillez entrer toutes les informations du cinema");
    });
    async function ajouterNouveauCinema(cinema){
        if(cookieGetter("privilege")!="gestionnaire"){
            alert("Vous devez être un gestionnaire pour ajouter des cinémas");
        }
        else{
            const response = await fetch("http://localhost/api/cinemas", {
                    method: 'POST',
                    
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cinema),
                });
                if (response.ok){
                alert("success");
                console.log(response);
                }else {
                    console.log(response);
                    alert("Le serveur a refusé");
                }
        }
    }
   
});

async function cinemaGetter(id){
    const responseCinema = await fetch("http://localhost/api/cinemas/gestionnaire/"+id);
    const content = await responseCinema.json();
    console.log(content);
    if(content.length>0){
        const divList = document.querySelector("div#liste_cinema > div");
        divList.textContent = "";
        const ul = document.createElement('ul');
        divList.append(ul);
        for (let cinema of content) {
           const li = document.createElement("li");
           const div = document.createElement("div");
           div.textContent = cinema.nom;
           const div2 = document.createElement("div");
           div2.textContent = cinema.emplacement;
           
           ul.append(li);
           li.append(div);
           li.append(div2)
    
        }
    }
    
}
function cookieGetter(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if(cookieName === name){
            console.log(cookieValue);
            return cookieValue;
        }
    }
    return false;
}
