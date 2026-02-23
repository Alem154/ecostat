function header_page(){
    const div_he = document.getElementById("header_dv");
    if(!div_he) return;
    let ht = '<a href="index.html"><h1 class="titre_header">Accueil</h1></a>';
    ht += '<a href="page1.html"><h1 class="titre_header">Page 1</h1></a>';
    ht += '<a href="page2.html"><h1 class="titre_header">Page 2</h1></a>';
    ht += '<a href="login.html"><h1 class="titre_header">Se connecter</h1></a>';

    div_he.innerHTML = ht;
}

document.addEventListener('DOMContentLoaded',header_page);