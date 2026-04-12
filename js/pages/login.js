document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleFormButton = document.getElementById("toggleFormButton");
    const formTitle = document.querySelector(".formTitle");

    if (!toggleFormButton) {
        console.error("toggleFormButton not found");
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