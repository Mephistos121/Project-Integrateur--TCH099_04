window.addEventListener("load", (event1) => {
    let ajoutCinema = document.querySelector("#creer_submit");
    ajoutCinema.addEventListener("click", (event2) => {
        
        const info_cinema = {
        nom: document.querySelector("#creer_nom").value,
        image: document.querySelector("#creer_image").value,
        emplacement: document.querySelector("#creer_emplacement").value,
        gestionnaire: document.cookie=1,//PLACEHOLDER
        };
        
        let check=true;
        Object.keys(info_cinema).forEach(element => {
            if (info_cinema[element]==="") check=false;
        });
        check ? ajouterNouveauCinema(info_cinema) : alert("Veuillez entrer toutes les informations du cinema");
    });
    async function ajouterNouveauCinema(cinema){
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
});
