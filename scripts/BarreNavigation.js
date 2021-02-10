export function barreNav(){
    // Je récupère mon élément nav avec son id
    let div = document.getElementById('barrenav');
    //var loc = location.href;

    //console.log(nav);
    //console.log(loc);


    let elements = [];

    // Création des divs clickables
    let boutonAcceuil = document.createElement("div");
    boutonAcceuil.innerHTML = "<p>ACCUEIL</p>";
    boutonAcceuil.addEventListener("click", ()=> {console.log("direction l'accueil");})
    elements.push(boutonAcceuil);

    let boutonDemineur = document.createElement("div");
    boutonDemineur.innerHTML = "<p>DEMINEUR</p>";
    boutonDemineur.addEventListener("click", ()=> {console.log("direction le démineur");})
    elements.push(boutonDemineur);

    let bouton2048 = document.createElement("div");
    bouton2048.innerHTML = "<p>2048</p>";
    bouton2048.addEventListener("click", ()=> {console.log("direction 2048");})
    elements.push(bouton2048);

    let boutonProfil = document.createElement("div");
    boutonProfil.innerHTML = "<p>PROFIL</p>";
    boutonProfil.addEventListener("click", ()=> {console.log("direction le profil");})
    elements.push(boutonProfil);

    // on rajoute tous les elements de la barre de navigation dans le nav du html
    for(let i = 0; i < elements.length; i++){
        //elements[i].setAttribute("class", "barrenav");
        //barre.innerHTML += elements[i];
        div.appendChild(elements[i]);
    }

    //div.appendChild(barre);
}