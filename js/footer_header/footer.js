function getRelativePrefix(){ // fonction qui ajoute le préfixe ../ en fonction de la profondeur des fichier
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const depth = Math.max(0, parts.length - 1);
    return '../'.repeat(depth);
}

function footer_page(){
    const div_fo = document.getElementById("footer_dv");
    if(!div_fo)return;
    const p = getRelativePrefix();
    let ft= `<a href="/${p}html/apropos.html"><h3 class="titre_header"> A propos</h3></a>`; // mettre votre nom au lieu du mieux (mael) si aucun lien en marche
    ft += `<a href="/${p}html/contact.html"><h3 class="titre_header">Nous contacter</h3></a>`;

    div_fo.innerHTML = ft;
}

document.addEventListener('DOMContentLoaded', footer_page);