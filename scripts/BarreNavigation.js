class AbsNav extends Abs {
    constructor() {
        super();
        //Variable pour savoir quelle page est la page actuelle
        this.PAGE = "INITIALISATION";
    }

    init(){
    }

    getMessage(message, pieceJointe){
        let result = "";
        if (message === MESSAGE.INIT){
            this.init();
        }
        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }
}

class PresNav extends Pres{
    constructor() {
        super();
        this.choixPage(this.PAGE);
    }

    getMessage(message, pieceJointe){
        switch (message) {
            case MESSAGE.CHANGEPAGE:
                this.choixPage(pieceJointe);
                break;
            case MESSAGE.AFFICHETOI:
                this.afficheNav();
                break;
        }
    }

    // Permet d'afficher la page qui doit l'être
    choixPage(message){
        switch (message){
            case MESSAGE.INIT ://Même chose que accueil
            case MESSAGE.ACCUEIL:
                //TODO => load acceuil
                this.PAGE = "ACCUEIL";
                this.highlightOnglet("Accueil");
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

    highlightOnglet(page) {
        // Modifie le CSS pour mettre en valeur l'onglet actuel
        // l'id html de l'element est composé comme ça : ongletAcceuil, ...
        let id = "onglet" + page;
        console.log(id);
    }

    afficheNav() {
        // Je récupère mon élément nav avec son id
        this.div = document.getElementById('barrenav');
        // Array qui contient les éléments de cette barre de nav
        this.elements = [];

        // Création des divs clickables
        let boutonAcceuil = document.createElement("div");
        boutonAcceuil.setAttribute("id","ongletAccueil");
        boutonAcceuil.innerHTML = "<p>ACCUEIL</p>";
        boutonAcceuil.addEventListener("click", ()=> {console.log("direction l'accueil");})
        this.elements.push(boutonAcceuil);

        let boutonDemineur = document.createElement("div");
        boutonDemineur.setAttribute("id", "ongletDemineur");
        boutonDemineur.innerHTML = "<p>DEMINEUR</p>";
        boutonDemineur.addEventListener("click", () => {
            console.log("direction le démineur");
            CtrlNav
        })
        this.elements.push(boutonDemineur);

        let bouton2048 = document.createElement("div");
        bouton2048.setAttribute("id", "onglet2048");
        bouton2048.innerHTML = "<p>2048</p>";
        bouton2048.addEventListener("click", () => {
            console.log("direction 2048");
        })
        this.elements.push(bouton2048);

        let boutonProfil = document.createElement("div");
        boutonProfil.setAttribute("id", "ongletProfil");
        boutonProfil.innerHTML = "<p>PROFIL</p>";
        boutonProfil.addEventListener("click", () => {
            console.log("direction le profil");
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
}