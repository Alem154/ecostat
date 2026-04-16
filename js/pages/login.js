document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleFormButton = document.getElementById("toggleFormButton");
    const formTitle = document.querySelector("h1");

    toggleFormButton.addEventListener("click", () => {
        if (loginForm.style.display === "none") {
            // Afficher le formulaire de connexion
            loginForm.style.display = "block";
            signupForm.style.display = "none";
            formTitle.textContent = "Connexion";
            toggleFormButton.textContent = "Créer un compte";
        } else {
            // Afficher le formulaire de création de compte
            loginForm.style.display = "none";
            signupForm.style.display = "block";
            formTitle.textContent = "Créer un compte";
            toggleFormButton.textContent = "Déjà un compte"; 
        }
    });
});

const toggleEye = document.getElementsByClassName("toggleEye");
const passwordInput = document.getElementById("passwordInput");

toggleEye.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleEye.src = "./css/img/show.png"
    } else {
        passwordInput.type = "password";
        toggleEye.src = "./css/img/hide.png"
    }
});