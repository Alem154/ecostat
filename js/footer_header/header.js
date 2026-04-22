function getRelativePrefix(){// fonction qui ajoute le préfixe ../ en fonction de la profondeur des fichier
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const depth = Math.max(0, parts.length - 1);
    return '../'.repeat(depth);
}

// Gestion du header de la page
function header_page(){
    const div_he = document.getElementById("header_dv");
    if(!div_he) return;
    const p = getRelativePrefix();
    
    // appel AJAX (évite de recharger la page entière) pour vérifier l'état de connexion
    fetch(`${p}php/page/check_auth.php`)
        .then(response => response.json())
        .then(data => {
            let ht = `<a href="${p}index.html"><h1 class="titre_header">Accueil</h1></a>`;
            ht += `<a href="${p}html/formulaire.html"><h1 class="titre_header">Formulaire</h1></a>`;
            
            // afficher le menu selon l'etat de connexion
            if(data.connected){
                ht += `<a href="${p}html/profile.html"><h1 class="titre_header">Profil</h1></a>`;
                ht += `<a href="${p}php/page/logout.php"><h1 class="titre_header">Déconnexion</h1></a>`;
                var pending = sessionStorage.getItem('pending_co2');
                if(pending){
                    sessionStorage.removeItem('pending_co2');
                    var co2 = JSON.parse(pending);
                    console.log('CO2 en attente détecté :', co2);
                    console.log('User ID reçu :', data.id);
                    var body = new URLSearchParams({
                        id_user: data.id,
                        transport: co2.transport,
                        alimentaire: co2.alimentaire,
                        logement: co2.logement,
                        numerique: co2.numerique
                    });
                    fetch(`${p}php/page/save_co2.php`, { method: 'POST', body: body })
                        .then(res =>{
                            if(!res.ok)throw new Error(`Erreur HTTP : ${res.status}`);
                            return res.json();
                        })
                        .then(result =>{
                            console.log('Réponse save_co2 :', result);
                            if(result.success){
                                var toast = document.getElementById('toast');
                                if(toast){
                                    toast.textContent = 'Votre empreinte CO2 a été sauvegardée !';
                                    toast.classList.add('show');
                                    setTimeout(function(){ toast.classList.remove('show'); }, 4000);
                                }
                            }
                        })
                        .catch(error =>{
                            console.error("Erreur lors de l'envoie des données CO2 :", error);
                        });
                }
            } else {
                ht += `<a href="${p}html/login.html"><h1 class="titre_header">Se connecter</h1></a>`;
            }
            
            div_he.innerHTML = ht;
        })
        .catch(error => {
            console.error("Erreur lors de la vérification de connexion:", error);
            // Menu par défaut en cas d'erreur
            let ht = `<a href="${p}index.html"><h1 class="titre_header">Accueil</h1></a>`;
            ht += `<a href="${p}html/formulaire.html"><h1 class="titre_header">Formulaire</h1></a>`;
            ht += `<a href="${p}html/login.html"><h1 class="titre_header">Se connecter</h1></a>`;
            div_he.innerHTML = ht;
        });
}

document.addEventListener('DOMContentLoaded',header_page);