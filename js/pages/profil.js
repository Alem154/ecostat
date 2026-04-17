function genGraph(){
   const bal = document.getElementById("graphe");
   jours = 0; /** nb de jours depuis l'inscription, à récupérer pour chaque utilisateur*/
   total = 0; /** nb total de la valeur pour la courbe (à incrémenter) (temporaire) */
   tab = '<h2 class="titre">Votre Profil</h2>';
   tab += '<table class="charts-css line multiple show-labels show-primary-axis">';

   for(i = 0; i < jours; i++){
      tab += '<tr><td style="--start:' /** +truc (à compléter) */;
      tab += '; --size: ' /** pareil */;
      tab += '"> <span class="data"></span></td></tr>';
   }
   tab += '</table>';
   
   bal.innerHTML = tab
}

document.addEventListener('DOMContentLoaded',genGraph);