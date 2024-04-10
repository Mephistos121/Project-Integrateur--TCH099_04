window.addEventListener("load", (event) => {

    let logoutButton = document.querySelector("#logoutButton");
    logoutButton.addEventListener("click", () => {
        deconnecterUtilisateur();
    });

    let deleteButton = document.querySelector("#supprimerButton");
    deleteButton.addEventListener("click", () => {
        supprimerCompte();
    });

    cacherMenuGestionnaire();
    cacherMenuAdmin();
    /*loadBilletNumber();*/

    const userID = getconnecterCookie();
    if (userID) {
        fetchUserEmail(userID);
        fetchUserNom(userID);
    }
});
const connecte = isConnected();
    if(!connecte){
        let url = window.location.toString();
        window.location = url.replace('compte.html', 'connexion.html');
    }
function  isConnected(){
    id=cookieGetter("id");
}

function cacherMenuGestionnaire() {
    let menuGestionnaire = document.querySelector("#menuGestionnaire");
    if (hasPrivilegeGestionnaire() && isConnected()) {
        menuGestionnaire.style.display = "block"; 
    } else {
        menuGestionnaire.style.display = "none";
    }
}

function cacherMenuAdmin() {
    let menuAdmin = document.querySelector("#menuAdmin");
    if (hasPrivilegeAdmin() && isConnected()) {
        menuAdmin.style.display = "block"; 
    } else {
        menuAdmin.style.display = "none";
    }
}

function getconnecterCookie() {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
        const[name, value] = cookie.split('=');
        if (name === 'id') {
            return value;
        }
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

function isConnected() {
    const connecterValue = getconnecterCookie();
    return connecterValue != null;
}

function hasPrivilegeGestionnaire() {
    const privilegeValue = getPrivilegeCookie();
    return privilegeValue === "gestionnaire";
}

function hasPrivilegeAdmin() {
    const privilegeValue = getPrivilegeCookie();
    return privilegeValue === "admin";
}

function deconnecterUtilisateur() {
    document.cookie = "id=; Max-Age=-1; path=/;";
    document.cookie = "privilege=; Max-Age=-1; path=/;";

    window.location.href = "connexion.html";

    alert("Vous avez été déconnecté.");
}

function fetchUserEmail(userID) {
    fetch(`/api/comptes/email/${userID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("emailUtilisateur").innerText = data.email;
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'email:', error));
}

function fetchUserNom(userID) {
    fetch(`/api/comptes/nom_usager/${userID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("nomUtilisateur").innerText = data.nom_usager;
        })
        .catch(error => console.error('Erreur lors de la récupération du nom:', error));
}

/*function addRowsToTable(numberOfRows) {
    const tableBody = document.querySelector("#billet_table tbody");

    for (let i = 0; i < numberOfRows; i++) {
        const newRow = document.createElement("tr");
        newRow.classList.add("rowDynamique");
        newRow.innerHTML = `
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
        `;
        tableBody.appendChild(newRow);
    }
}
*/
async function supprimerCompte() {
    try {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        if (!confirmation) {
            return;
        }
        const userID = getconnecterCookie();
        if (!userID) {
            alert("Impossible de trouver l'identifiant de l'utilisateur.");
            return;
        }
        const response = await fetch(`http://localhost/api/comptes/${userID}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("Le compte a été supprimé avec succès.");
            deconnecterUtilisateur();
        } else {
            alert("Une erreur s'est produite lors de la suppression du compte.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }   
}

/*async function loadBilletNumber() {
    const userID = getconnecterCookie();
    if (userID) {
        try {
            console.log("URL de la requête fetch:", `/api/billets/compteur/usager/${userID}`);
            const response = await fetch(`/api/billets/compteur/usager/${userID}`);
            console.log("Réponse de la requête fetch:", response);
            const data = await response.json();
            console.log("Données extraites de la réponse:", data);
            const numberOfBillets = data.nombre_occurrences;

            addRowsToTable(numberOfBillets);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération du nombre de billets:", error);
        }
    }
}*/