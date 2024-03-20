window.addEventListener('load', (event1) =>{
    const perms=cookieGetter("privilege");
    const sbutton = document.querySelector("#film_ajout");
    if(perms==="administrateur"){
        sbutton.addEventListener("click", (event3) => {
            
            const info_film = {
            nom_film: document.querySelector("#film_nom").value,
            image: document.querySelector("#film_img").value,
            description: document.querySelector("#film_desc").value,
            };
            
            let check=true;
            Object.keys(info_film).forEach(element => {
                if (info_film[element]==="") check=false;
            });
                check ? ajouterNouveauFilm(info_film) : alert("Veuillez entrer toutes les informations du compte");
        });
    }else{
        sbutton.disabled = true;
    }
});

async function ajouterNouveauFilm(film){
    const filmResponse = await fetch("http://localhost/api/films/ajout", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
    });
    const content = await filmResponse.json();
    console.log(content);
    if(content.erreur){
        alert(content.erreur);
    }else{
        alert("Le film a été ajouté avec succès");
    }
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
