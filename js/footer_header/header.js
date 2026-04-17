function getRelativePrefix(){// fonction qui ajoute le préfixe ../ en fonction de la profondeur des fichier
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const depth = Math.max(0, parts.length - 1);
    return '../'.repeat(depth);
}

function header_page(){ //supprimer le mael pour projet final !!
    const div_he = document.getElementById("header_dv");
    if(!div_he) return;
    const p = getRelativePrefix();
    let ht = `<a href="mael/${p}ecostat/index.html"><h1 class="titre_header">Accueil</h1></a>`;
    ht += `<a href="mael/${p}ecostat/HTML/page1.html"><h1 class="titre_header">Page 1</h1></a>`;
    ht += `<a href="mael/${p}ecostat/HTML/page2.html"><h1 class="titre_header">Page 2</h1></a>`;
    ht += `<a href="mael/${p}ecostat/HTML/login.html"><h1 class="titre_header">Se connecter</h1></a>`;

    div_he.innerHTML = ht;
}

document.addEventListener('DOMContentLoaded',header_page);