window.addEventListener("load", (event1) => {
  let sbutton = document.querySelector("#creer_submit");
  sbutton.addEventListener("click", (event3) => {
    const info_compte = {
      nom: document.querySelector("#creer_nom").value,
      courriel: document.querySelector("#creer_courriel").value,
      mot_passe: document.querySelector("#creer_pass").value,
      privilege: document.querySelector("#privilege").checked,
      salt: makeSalt(),
    };
    console.log(info_compte.mot_passe);
    let check = true;
    Object.keys(info_compte).forEach((element) => {
      if (info_compte[element] === "") check = false;
    });
    check
      ? ajouterNouveauCompte(info_compte)
      : actionReussi("Veuillez entrez toutes les informations pour le compte");
  });

  let connecterButton = document.querySelector("#connecterButton");
  connecterButton.addEventListener("click", (event4) => {
    const identifiant = document.querySelector("#connecter_identifiant").value;
    const motDePasse = document.querySelector("#connecter_pass").value;
    if (identifiant && motDePasse) {
      seConnecter(identifiant, motDePasse);
    } else {
      actionReussi("Veuillez remplir tous les champs");
    }
  });

  let signInSection = document.getElementById("signUpSection");
  closeDiv(signInSection);

  let signInButton = document.querySelector("#signInButton");
  let signUpButton = document.querySelector("#signUpButton");

  signInButton.addEventListener("click", () => {
    let signInSection = document.getElementById("signInSection");
    let signUpSection = document.getElementById("signUpSection");
    showDiv(signInSection);
    closeDiv(signUpSection);
  });

  signUpButton.addEventListener("click", () => {
    let signUpSection = document.getElementById("signUpSection");
    let signInSection = document.getElementById("signInSection");
    showDiv(signUpSection);
    closeDiv(signInSection);
  });
});
const connecte = isConnected();
if (connecte) {
  let url = window.location.toString();
  window.location = url.replace("connexion.html", "compte.html");
}
function isConnected() {
  id = cookieGetter("id");
}
function showDiv(section) {
  section.style.display = "block";
}

function closeDiv(section) {
  section.style.display = "none";
}

function toggle(section) {
  if (section.style.display === "block") {
    closeDiv(section);
  } else {
    showDiv(section);
  }
}

async function uniqueEmail(compte) {
  const responeMail = await fetch(
    "https://equipe500.tch099.ovh/projet4/api/comptes/" + compte.courriel
  );
  const content = await responeMail.json();
  if (content.courriel != null) {
    return true;
  }
  return false;
}

async function getSaltByEmail(courriel) {
  const responeMail = await fetch("https://equipe500.tch099.ovh/projet4/api/comptes/" + courriel);
  const content = await responeMail.json();
  return content.salt;
}

function error(error) {
  const error_div = document.querySelector("#error_code");
  error_div.innerHTML = error;
}

async function ajouterNouveauCompte(compte) {
  const regex = new RegExp("[a-zA-Z0-9_]+@([a-zA-Z0-9_]+.)+[a-zA-Z0-9_]");

  if (regex.test(compte.courriel)) {
    uniqueEmail(compte).then(async function (results) {
      if (results === true) {
        error("Ce courriel est déjà utilisé");
      } else {
        const response = await fetch("https://equipe500.tch099.ovh/projet4/api/comptes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(compte),
        });
        if (response.ok) {
          actionReussi("Succès");
          document.querySelector("#creer_form").reset();
        } else {
          actionReussi("Erreur du serveur, veuillez réessayer plus tard");
        }
      }
    });
  } else {
    actionReussi("Ceci ne semble pas être un courriel valide");
  }
}

async function seConnecter(courriel, mot_passe) {
  try {
    salt = await getSaltByEmail(courriel);

    const url = "https://equipe500.tch099.ovh/projet4/api/connexion";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courriel, mot_passe, salt }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      if (responseData === false) {
        actionReussi("Mauvais email ou mot de passe");;
      } else {
        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000); //le temps ajouté est égal à 1 jours. Multiplier par un nombre pour avoir +/- de jours
        document.cookie =
          "id=" + responseData.id + "; expires=" + d + "; path=/;";
        document.cookie =
          "privilege=" + responseData.role + ";expires=" + d + "; path=/;";

          actionReussi("Vous êtes connecté");
        let url = window.location.toString();
        window.location = url.replace("compte.html", "connexion.html");
      }
    } else {
      console.error("Échec de la connexion");
      actionReussi("Échec de la connexion, veuillez vérifiez vos identifiants");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    actionReussi("Erreur lors de la connexion. Veuillez réessayer plus tard.");
  }
}

function isConnected() {
  const connecterValue = getconnecterCookie();
  return connecterValue != null;
}

function getPrivilegeCookie() {
  const cookieArray = document.cookie.split("; ");
  for (const cookie of cookieArray) {
    const [name, value] = cookie.split("=");
    if (name === "privilege") {
      return value;
    }
  }
  return null;
}

function getconnecterCookie() {
  const cookieArray = document.cookie.split("; ");
  for (const cookie of cookieArray) {
    const [name, value] = cookie.split("=");
    if (name === "id") {
      return value;
    }
  }
}

function makeSalt() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 16) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function actionReussi(raison){
  const div = document.querySelector("#banniere");
  div.hidden = false;
  div.innerText = raison;
  setTimeout(() => {
    div.hidden = true;
  }, "5000");
}
