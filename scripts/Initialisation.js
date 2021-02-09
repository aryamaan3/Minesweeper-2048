
//import { barreNav } from "./BarreNavigation.js";

// Fonction qui est executée uniquement lorsque tout le HTML est chargé (cf cours M. BUFFA)
window.onload = function init(){
    barreNav();
}

function barreNav(){
    // Je récupère mon élément nav avec son id
    let div = document.getElementById('barrenav');
    //var loc = location.href;

    //console.log(nav);
    //console.log(loc);

    // Je crée la barre de navigation
    let barre = document.createElement("ul");
    let elements = [];

    elements.push(document.createElement("li").innerHTML = "<a href=\"./index.html\">ACCUEIL</a>");
    elements.push(document.createElement("li").innerHTML = "<a href=\"./minesweeper/demineur.html\">DEMINEUR</a>");
    elements.push(document.createElement("li").innerHTML = "<a href=\"./2048/2048.html\">2048</a>");
    elements.push(document.createElement("li").innerHTML = "<a href=\"./profil/profil.html\">PROFIL</a>");


    // on rajoute tous les elements de la barre de navigation dans le nav du html
    for(let i = 0; i < elements.length; i++){
        //elements[i].setAttribute("class", "barrenav");
        barre.innerHTML += elements[i];
    }

    div.appendChild(barre);
}