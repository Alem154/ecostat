function header_page(){
    const div_he = document.getElementById("header_dv");
    if(!div_he) return;
    let ht = '<a href="index.html>Accueil</a>';
    ht += '<a href="HTML/page1.html>Page 1</a>';
    div_he.innerHTML = ht;
}

document.addEventListener('DOMContentLoaded',footer_page);