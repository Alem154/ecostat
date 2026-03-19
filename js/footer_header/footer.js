function footer_page(){
    const div_fo = document.getElementById("footer_dv");
    if(!div_fo)return;
    let ft= '<a href="apropos.html"><h3 class="titre_header"> A propos</h3></a>';
    ft += '<a href="contact.html"><h3 class="titre_header">Nous contacter</h3></a>';
    div_fo.innerHTML = ft;
}

document.addEventListener('DOMContentLoaded', footer_page);