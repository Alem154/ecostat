document.addEventListener("DOMContentLoaded", () => {
    const param = new URLSearchParams(window.location.search);
    const error = param.get("error");
    if(error){
        const messages = {
            identifiants: "Identifiant ou mot de passe incorrect",
            email: "Cette adresse email existe déjà",
            pseudo: "Ce pseudo existe déjà",
            creation: "La création du compte a échoué",
            champsVides: "Veuillez remplir tous les champs"
        };
        const texte = messages[error] || "une erreur est survenu";
        if(error === "identifiants"){
            document.getElementById("loginError").textContent = texte;
        }else{
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("signupForm").style.display = "block";
            document.getElementById("signupError").textContent = texte;
        }
    }

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleFormButton = document.getElementById("toggleFormButton");
    const formTitle = document.querySelector(".formTitle");

    if (!toggleFormButton) {
        console.error("toggleFormButton error");
        return;
    }
    
    toggleFormButton.addEventListener("click", () => {
        if (loginForm.style.display === "none") {
            // Form de connexion
            loginForm.style.display = "block";
            signupForm.style.display = "none";
            formTitle.textContent = "Connexion";
            toggleFormButton.textContent = "Créer un compte";
        } else {
            // Form de créa de compte
            loginForm.style.display = "none";
            signupForm.style.display = "block";
            formTitle.textContent = "Créer un compte";
            toggleFormButton.textContent = "Déjà un compte"; 
        }
    });

    // Icone d'affichage et de masquage de mdp
    const toggleEyeButtons = document.getElementsByClassName("toggleEye");
    for (let eye of toggleEyeButtons) {
        eye.addEventListener("click", function() {
            const input = this.parentElement.querySelector("input[type='password'], input[type='text']");
            if (input) {
                if (input.type === "password") {
                    input.type = "text";
                    this.src = "../css/img/show.png";
                } else {
                    input.type = "password";
                    this.src = "../css/img/hide.png";
                }
            }
        });
    }
});