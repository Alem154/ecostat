document.addEventListener("DOMContentLoaded", () => {
    // Récupere les infos de l'user
    fetch("/php/page/get_profile.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
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

    chargerGraphe();

    // Gérer le formulaire de mdp
    const passwordForm = document.getElementById("passwordForm");
    if (passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const oldPassword = document.getElementById("old_mdp").value;
            const newPassword = document.getElementById("new_mdp").value;
            const confirmPassword = document.getElementById("confirm_mdp").value;
            const messageDiv = document.getElementById("mdp_mess");

            // Vérifi mdp pas vide
            if (!oldPassword || !newPassword || !confirmPassword) {
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
                    if (data.error) {
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


function chargerGraphe() {
    fetch("/php/page/get_co2_histo.php")
        .then(response => response.json())
        .then(donnees => {
            const chargement = document.getElementById("graphe_chargement");
            const container = document.getElementById("graphe_container");
            const vide = document.getElementById("graphe_vide");
            const legende = document.getElementById("graphe_legende");
            const tbody = document.getElementById("graphe_body");

            chargement.style.display = "none";
            if(!donnees || donnees.length === 0){
                vide.style.display = "block";
                return;
            }

            const valeurs = donnees.map(d => d.total);
            const max = Math.max(...valeurs);
            tbody.innerHTML = donnees.map((d, i) => {
                const precedent = i === 0 ? 0 : donnees[i - 1].total;
                const taille = max > 0 ? d.total / max : 0;
                const depart = max > 0 ? precedent / max : 0;

                return `<tr>
                            <th scope="row">${d.date}</th>
                            <td style="--start: ${depart.toFixed(4)}; --size: ${taille.toFixed(4)}">
                                <span class="data">${d.total.toLocaleString('fr-FR')} kg </span>
                            </td>
                        </tr>`;
            }).join("");

            const derniere = donnees[donnees.length - 1];
            legende.textContent = `Dernière saisie : ${derniere.total.toLocaleString('fr-FR')} kg CO2/an - ${donnees.length} entrée(s) enregistrée(s)`;
            container.style.display = "block";
        })
        .catch(error => {
            console.error("Erreur graphe:", error);
            document.getElementById("graphe_chargement").textContent = "Impossible de charger le graphe.";
        });
}