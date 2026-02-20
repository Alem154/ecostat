function footer_page(){
    const div_fo = document.getElementById("footer_dv");
    if(!div_fo)return;
    let ft= '<p> A propos</p>';
    ft += '<p>Nous contacter</p>';
    div_fo.innerHTML = ft;
}

document.addEventListener('DOMContentLoaded', footer_page);