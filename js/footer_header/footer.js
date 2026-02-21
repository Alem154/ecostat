function footer_page(){
    const div_fo = document.getElementById("footer_dv");
    if(!div_fo)return;
    let ft= '<h3 class="titre"> A propos</h3>';
    ft += '<h3 class="titre">Nous contacter</h3>';
    div_fo.innerHTML = ft;
}

document.addEventListener('DOMContentLoaded', footer_page);