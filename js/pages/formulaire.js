const FACTORS = {
    logement: { appart_recent: 800, appart_ancien: 1600, maison_recent: 1400, maison_ancienne: 2800 },
    chauffage: { gaz: 2000, electricite: 400, fioul: 3500, bois: 300, pompe: 200 },
    conso_elec: (kwh) => kwh * 0.057,
    transport: { voiture_essence: 3200, voiture_diesel: 2900, voiture_electrique: 800, transport_commun: 200, velo: 0 },
    km_factor: { voiture_essence: 0.21, voiture_diesel: 0.19, voiture_electrique: 0.045, transport_commun: 0.08, velo: 0},
    vols_long: (n) => n * 3500,
    vols_court: (n) => n * 400,
    regime: { vegan: 1000, vegetarien: 1500, flexitarien: 2000, omnivore: 2700, carnivore: 3600 },
    local: { fort: -200, moyen: 0, faible: 300 },
    gaspillage: { faible: 0, moyen: 150, fort: 350 },
    digital: (n) => n * 300,
};

var sliderPersonnesTouche = false;
var sliderKmTouche = false;

// Récupération valeur bouton radio
function getRadio(name){
    const el = document.querySelector('[name="'+ name +'"]:checked');
    return el ? el.value : null;
}

// Récupération champ HTML
function getSel(id){
    const el = document.getElementById(id);
    return el && el.value ? el.value : null;
}

// calule la quantité de co2 produite
function calcCO2(){
    let logement = 0;
    let transport = 0;
    let alim = 0;

    var logType = getRadio('logType');
    var chauffage = getRadio('chauffage');
    var nbPers = parseInt(document.getElementById('nbPersonnes').value) || 2;
    var consoElec = getSel('conso_elec');
    
    if(logType) logement += FACTORS.logement[logType] || 0;
    if(chauffage) logement += FACTORS.chauffage[chauffage] || 0;
    if(consoElec) logement += FACTORS.conso_elec(parseFloat(consoElec));
    logement = logement / nbPers;

    var transp = getRadio('transport');
    var kmSem = parseInt(document.getElementById('kmSemaine').value) || 0;
    var volsLong = getRadio('vols_long');
    var volsCourt = getSel('vols_court');

    if(transp){
        transport += (FACTORS.transport[transp] || 0) + (FACTORS.km_factor[transp] || 0) * kmSem * 52;
    }
    if(volsLong !== null) transport += FACTORS.vols_long(parseFloat(volsLong));
    if(volsCourt !== null) transport += FACTORS.vols_court(parseFloat(volsCourt));

    var regime = getRadio('regime');
    var local = getRadio('local');
    var gaspillage = getRadio('gaspillage');

    if(regime) alim += FACTORS.regime[regime] || 0;
    if(local) alim += FACTORS.local[local] || 0;
    if(gaspillage) alim += FACTORS.gaspillage[gaspillage] || 0;

    var digital = getRadio('digital');
    var num = digital ? FACTORS.digital(parseFloat(digital)) : 0;

    var total = Math.round(logement + transport + alim + num);
    return { total: total, logement: Math.round(logement), transport: Math.round(transport), alim: Math.round(alim), num: Math.round(num)};
}

// Mise a jour de l'interface graphique
function updateUI(){
    var r = calcCO2();
    var MAX = 20000;
    document.getElementById('rTotal').textContent = r.total.toLocaleString('fr-FR');
    document.getElementById('rBar').style.width = Math.min(r.total / MAX * 100, 100) + '%';

    var compare = '';
    if(r.total < 4000) compare = 'Bien en dessous de la moyenne francaise (~10 t/an)';
    else if(r.total < 7000) compare = 'En dessous de la moyenne francaise (~10 t/an)';
    else if(r.total < 10000) compare = 'Dans la moyenne francaise (~10 t/an)';
    else if(r.total < 15000) compare = 'Au-dessus de la moyenne francaise (~10 t/an)';
    else compare = 'Très au-dessus de la moyenne francaise (~10 t/an)';
    document.getElementById('rCompare').textContent = compare;
    var pills = [
        { icon:'', label:'Logement', val: r.logement},
        { icon:'', label:'Transport', val: r.transport},
        { icon:'', label:'Alimentation', val: r.alim},
        {icon:'', label:'Numerique', val: r.num}
    ];
    document.getElementById('rBreakdown').innerHTML = pills.map(function(b){
        return '<span class="bd_pill">' + b.icon + ' ' + b.label+ '<strong>'+ ' '+ b.val.toLocaleString('fr-FR') + ' kg</strong></span>';
    }).join('');
}

//Mise a jour de la barre de progression
function updateProgress(){
    var fields = ['logType','chauffage','transport','vols_long','regime','local','gaspillage','digital'];
    var selects = ['conso_elec', 'vols_court'];
    var count = 0;
    fields.forEach(function(f) { if (document.querySelector('[name="'+f+'"]:checked')) count++;});
    selects.forEach(function(id) { var el = document.getElementById(id); if(el && el.value) count++;});
    if(sliderPersonnesTouche) count++;
    if(sliderKmTouche) count++;
    count = Math.min(count, 12);
    var pct = Math.round(count / 12 * 100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent = count + ' / 12 réponses';
}

// Affiche ou masque la question sur les km
function toggleKm(){
    var transp = document.querySelector('[name="transport"]:checked');
    var qKm = document.getElementById('q_km');
    qKm.style.display = (transp && transp.value !== 'velo') ? 'block' : 'none';
}

// Mise a jour de l'apparence des tuiles (bouton)
function updateTileGroups(){
    document.querySelectorAll('.tile_group').forEach(function(grp){
        grp.querySelectorAll('label').forEach(function(lbl){
            var inp = lbl.querySelector('input');
            if(inp) lbl.classList.toggle('selected', inp.checked);
        });
    });
}

// Mise a jour du slider
function initRange(id, valId, fmt){
    var inp = document.getElementById(id);
    var val = document.getElementById(valId);
    function refresh(){
        val.textContent = fmt(inp.value);
        var pct = (inp.value - inp.min) / (inp.max - inp.min) * 100;
        inp.style.setProperty('--pct', pct + '%'); // cf prblm
    }
    inp.addEventListener('input', function(){
        if(id == 'nbPersonnes') sliderPersonnesTouche = true;
        if(id == 'kmSemaine') sliderKmTouche = true;
        refresh();updateUI();updateProgress();
    });
    refresh();
}

//Message temporaire
function showToast(msg, duration){
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show');}, duration || 3500);
}

// Gestion du préfix du chemin
function getPrefix(){
    var path = window.location.pathname;
    var parts = path.split('/').filter(Boolean);
    var depth = Math.max(0, parts.length -1);
    var prefix = '';
    for(var i = 0; i < depth; i++) prefix+='../';
    return prefix;
}

// Soumission des résultat du from au serveur (ou stockage)
async function submitResults(){

    var r = calcCO2();
    var p = getPrefix();
    var authData = { connected: false };
    try{
        var authRes = await fetch(p + 'php/page/check_auth.php');
        authData =await authRes.json();
    } catch(e) {}

    var msg = document.getElementById('submitMsg');
    msg.style.display = 'block';

    if(authData.connected){
        try {
            var body = new URLSearchParams({
                id_user: authData.id,
                transport: r.transport,
                alimentaire: r.alim,
                logement: r.logement,
                numerique: r.num
            });
            var res = await fetch(p + 'php/page/save_co2.php', { method: 'POST', body: body });
            var data = await res.json();
            if(data.success){
                showToast('Données enregistrées sur votre compte.');
                msg.style.color = 'green';
                msg.textContent = 'Résultat enregistré : '+ r.total.toLocaleString('fr-FR') + ' kg CO2/an ajouté à votre profil.';
            } else{
                showToast('Erreur lors de l\'enregistrement.');
                msg.style.color = 'red';
                msg.textContent = 'Erreur lors de l\'enregistrement. Veuillez réessayer.';
            }
        }catch(e){
            showToast('Impossible de contacter le serveur');
            msg.style.color = 'red';
            msg.textContent = 'Impossible de contacter le serveur.';
        }
    } else{
        sessionStorage.setItem('pending_co2', JSON.stringify({
            transport: r.transport,
            alimentaire: r.alim,
            logement: r.logement,
            numerique: r.num,
            total: r.total
        }))
        showToast('Votre empreinte : ' + r.total.toLocaleString('fr-FR') + ' kg CO2/an');
        msg.style.color = 'gray';
        msg.innerHTML = 'Votre empreinte estimée : <strong>' + r.total.toLocaleString('fr-FR') + ' kg CO2/an</strong>.<br>' + '<button onclick="window.location.href=\'' + p + 'html/login.html\'" '+'style="margin-top:.8rem;padding:.6rem 1.4rem;background:green;color:#fff;border:none;border-radius:99px;cursor:pointer;font-weight:700;font-size:.9rem;">'+'Connectez-vous pour sauvegarder vos résultats sur votre profil.</button>';
    }
}

document.addEventListener('DOMContentLoaded', function(){
    initRange('nbPersonnes','nbPersonnesVal', function(v){return v;});
    initRange('kmSemaine', 'kmSemaineVal', function(v){return v + ' km';});

    document.querySelectorAll('input[type="radio"], select').forEach(function(el){
        el.addEventListener('change', function(){
            toggleKm();
            updateTileGroups();
            updateUI();
            updateProgress();
        });
    });

    document.getElementById('btnSubmit').addEventListener('click', submitResults);

    updateUI();
    updateProgress();
    toggleKm();
})