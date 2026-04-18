function getRelativePrefix(){// fonction qui ajoute le préfixe ../ en fonction de la profondeur des fichier
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const depth = Math.max(0, parts.length - 1);
    return '../'.repeat(depth);
}

function header_page(){ //suppriemr les mael pour version final
    const div_he = document.getElementById("header_dv");
    if(!div_he) return;
    const p = getRelativePrefix();
    
    // appel AJAX (évite de recharger la page entière) pour vérifier l'état de connexion
    fetch(`mael/${p}php/page/check_auth.php`)
        .then(response => response.json())
        .then(data => {
            let ht = `<a href="mael/${p}index.html"><h1 class="titre_header">Accueil</h1></a>`;
            ht += `<a href="mael/${p}html/formulaire.html"><h1 class="titre_header">Formulaire</h1></a>`;
            
            // afficher le menu selon l'etat de connexion
            if(data.connected){
                ht += `<a href="mael/${p}html/profile.html"><h1 class="titre_header">Profil</h1></a>`;
                ht += `<a href="mael/${p}php/page/logout.php"><h1 class="titre_header">Déconnexion</h1></a>`;
            } else {
                ht += `<a href="mael/${p}html/login.html"><h1 class="titre_header">Se connecter</h1></a>`;
            }
            
            div_he.innerHTML = ht;
        })
        .catch(error => {
            console.error("Erreur lors de la vérification de connexion:", error);
            // Menu par défaut en cas d'erreur
            let ht = `<a href="mael/${p}index.html"><h1 class="titre_header">Accueil</h1></a>`;
            ht += `<a href="mael/${p}html/formulaire.html"><h1 class="titre_header">Formulaire</h1></a>`;
            ht += `<a href="mael/${p}html/login.html"><h1 class="titre_header">Se connecter</h1></a>`;
            div_he.innerHTML = ht;
        });
}

document.addEventListener('DOMContentLoaded',header_page);