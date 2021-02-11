class AbsNav extends Abs {
    constructor() {
        super();
        //Variable pour savoir quelle page est la page actuelle
        this.PAGE = "INITIALISATION";
        this.choixPage(this.PAGE);
    }

    init(){
    }

    getMessage(message, pieceJointe){
        //console.log("Abs Nav recoit : "+message);
        let result = "";
        if (message === MESSAGE.INIT){
            this.init();
        }
        else if (message === MESSAGE.CHANGEPAGE){
            this.choixPage(pieceJointe);
        }
        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }

    // Permet d'afficher la page qui doit l'être
    choixPage(message){
        switch (message){
            case MESSAGE.INIT ://Même chose que accueil
            case MESSAGE.ACCUEIL:
                //TODO => load acceuil
                this.PAGE = "ACCUEIL";
                // On highlight l'onglet qui a été cliqué
                this.ctrl.getMessageFromAbstraction(MESSAGE.HIGHLIGHT, "Accueil");
                //this.highlightOnglet("Accueil");
                break;
            case MESSAGE["2048"]:
                //TODO => load 2048
                this.PAGE = "2048";
                this.highlightOnglet("2048");
                break;
            case MESSAGE.DEMINEUR:
                //TODO => load acceuil
                this.PAGE = "DEMINEUR";
                this.highlightOnglet("Demineur");
                break;
            case MESSAGE.PROFIL:
                //TODO => load acceuil
                this.PAGE = "PROFIL";
                this.highlightOnglet("Profil");
                break;
        }
    }
}

class PresNav extends Pres{
    constructor() {
        super();
        // Je récupère mon élément nav avec son id
        this.div = document.getElementById('barrenav');
        // Array qui contient les éléments de cette barre de nav
        this.elements = [];
    }

    getMessage(message, pieceJointe){
        switch (message) {
            case MESSAGE.CHANGEPAGE:
                this.choixPage(pieceJointe);
                break;
            case MESSAGE.AFFICHETOI:
                this.afficheNav();
                break;
            case MESSAGE.HIGHLIGHT:
                this.highlightOnglet(pieceJointe);
                break;
        }
    }

    highlightOnglet(page) {
        // Modifie le CSS pour mettre en valeur l'onglet actuel
        // l'id html de l'element est composé comme ça : ongletAcceuil, ...
        let id = "onglet" + page;
        let element = document.getElementById(id);
        console.log("Voici l'element à highlight : "+element);

        // Effacer l'ancien highlight
        //TODO
        let ancien = document.getElementsByClassName("highlight");
        //ancien.className = "";
        ancien.style.cssText = "";

        // Placer le nouveau highlight
        //element.className = "current-tab";
        element.style.cssText = "background-color: burlywood";
    }

    afficheNav() {
        // Création des divs clickables
        let boutonAcceuil = document.createElement("div");
        boutonAcceuil.setAttribute("id","ongletAccueil");
        boutonAcceuil.innerHTML = "<p>ACCUEIL</p>";
        boutonAcceuil.addEventListener("click", ()=> {
            console.log("direction l'accueil");
            this.ctrl.getMessageFromPresentation(MESSAGE.CHANGEPAGE, MESSAGE.ACCUEIL);
        })
        this.elements.push(boutonAcceuil);

        let boutonDemineur = document.createElement("div");
        boutonDemineur.setAttribute("id", "ongletDemineur");
        boutonDemineur.innerHTML = "<p>DEMINEUR</p>";
        boutonDemineur.addEventListener("click", () => {
            console.log("direction le démineur");
            this.ctrl.getMessageFromPresentation(MESSAGE.CHANGEPAGE, MESSAGE.DEMINEUR);
        })
        this.elements.push(boutonDemineur);

        let bouton2048 = document.createElement("div");
        bouton2048.setAttribute("id", "onglet2048");
        bouton2048.innerHTML = "<p>2048</p>";
        bouton2048.addEventListener("click", () => {
            console.log("direction 2048");
            this.Ctrl.getMessageFromPresentation(MESSAGE.CHANGEPAGE, MESSAGE["2048"]);
        })
        this.elements.push(bouton2048);

        let boutonProfil = document.createElement("div");
        boutonProfil.setAttribute("id", "ongletProfil");
        boutonProfil.innerHTML = "<p>PROFIL</p>";
        boutonProfil.addEventListener("click", () => {
            console.log("direction le profil");
            this.Ctrl.getMessageFromPresentation(MESSAGE.CHANGEPAGE, MESSAGE.PROFIL);
        })
        this.elements.push(boutonProfil);

        // on rajoute tous les elements de la barre de navigation dans le nav du html
        for (let i = 0; i < this.elements.length; i++) {
            //elements[i].setAttribute("class", "barrenav");
            //barre.innerHTML += elements[i];
            this.div.appendChild(this.elements[i]);
        }
    }
}

class CtrlNav extends Ctrl{
    constructor(abs, pres) {
        super(abs,pres);
    }

    getMessageFromParent(message){
        console.log("[NAV] Message recu de ciment :"+message);
        if (message === MESSAGE.INIT){
            this.abs.getMessage(message);
            this.pres.getMessage(MESSAGE.AFFICHETOI);
        }
    }

    getMessageFromAbstraction(message, piecejointe){
        //console.log("CtrlNav recoit : "+message);
        switch (message){
            case MESSAGE.HIGHLIGHT:
                this.pres.getMessage(message, piecejointe);
                break;
        }
    }

    getMessageFromPresentation(message, piecejointe){
        console.log("Ctrl Nav recoit : "+message);
        switch (message){
            case MESSAGE.CHANGEPAGE:
                this.abs.getMessage(MESSAGE.CHANGEPAGE, piecejointe);
                break;
        }
    }
}