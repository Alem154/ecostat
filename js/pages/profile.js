document.addEventListener("DOMContentLoaded", () => {
    // Récupere les infos de l'user
    fetch("/php/page/get_profile.php")
        .then(response => response.json())
        .then(data => {
            if(data.error){
                // Redirection si non connecter
                window.location.href = "/html/login.html";
                return;
            }
            
            // Afficher les infos
            document.getElementById("pseudo").textContent = data.pseudo;
            document.getElementById("email").textContent = data.email;
        })
        .catch(error => {
            console.error("Erreur:", error);
            window.location.href = "/html/login.html";
        });

    // Gérer le formulaire de mdp
    const passwordForm = document.getElementById("passwordForm");
    if(passwordForm){
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const oldPassword = document.getElementById("old_mdp").value;
            const newPassword = document.getElementById("new_mdp").value;
            const confirmPassword = document.getElementById("confirm_mdp").value;
            const messageDiv = document.getElementById("mdp_mess");
            
            // Vérifi mdp pas vide
            if(!oldPassword || !newPassword || !confirmPassword){
                messageDiv.textContent = "Tous les champs sont obligatoires";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.display = "block";
                return;
            }
            
            // Requête au serveur
            fetch("/php/page/change_password.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    messageDiv.textContent = data.error;
                    messageDiv.style.backgroundColor = "#f8d7da";
                    messageDiv.style.color = "#721c24";
                } else {
                    messageDiv.textContent = data.success;
                    messageDiv.style.backgroundColor = "#d4edda";
                    messageDiv.style.color = "#155724";
                    passwordForm.reset();
                }
                messageDiv.style.display = "block";
            })
            .catch(error => {
                console.error("Erreur:", error);
                messageDiv.textContent = "Une erreur s'est produite";
                messageDiv.style.backgroundColor = "#f8d7da";
                messageDiv.style.color = "#721c24";
                messageDiv.style.display = "block";
            });
        });
    }
});


//Graphe

function genGraph(){
   const bal = document.getElementById("graphe");
   jours = 1; /** nb de jours depuis l'inscription, à récupérer pour chaque utilisateur*/
   total = 0; /** nb total de la valeur pour la courbe (à incrémenter) (temporaire) */
   tab = '<h2 class="titre">Vos résultats</h2>';
   tab += '<table class="charts-css line multiple show-labels show-primary-axis">';

   for(i = 0; i < jours; i++){
      tab += '<tr><td style="--start:' /** +truc (à compléter) */;
      tab += '; --size: ' /** pareil */;
      tab += '"> <span class="data"></span></td></tr>';
   }
   tab += '</table>';
   
   bal.innerHTML = tab
}

document.addEventListener('DOMContentLoaded',genGraph);