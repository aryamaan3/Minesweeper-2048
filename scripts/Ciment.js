class AbsCiment extends Abs{

    constructor() {
        super();
        //Variable pour savoir quelle page est la page actuelle
        this.PAGE = "INITIALISATION";
        this.choixPage(this.PAGE);
    }

    getMessage(message, pieceJointe){
        switch (message) {
            case "CHANGEMENTPAGE":
                this.choixPage(pieceJointe);
                break;
        }
    }

    // Permet d'afficher la page qui doit l'être
    choixPage(message){
        switch (message){
            case "INITIALISATION"://Même chose que accueil
            case "ACCUEIL":
                //TODO => load acceuil
                this.PAGE = "ACCUEIL";
                this.highlightOnglet("Accueil");
                break;
            case "2048":
                //TODO => load 2048
                this.PAGE = "2048";
                this.highlightOnglet("2048");
                break;
            case "DEMINEUR":
                //TODO => load acceuil
                this.PAGE = "DEMINEUR";
                this.highlightOnglet("Demineur");
                break;
            case "PROFIL":
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
}

class PresCiment extends Pres{
    constructor() {
        super();
    }

    getMessage(message, pieceJointe){
        //TODO
    }
}

class CtrlCiment extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    /**
     * pour lancer l'initialisation dans la hierarchie
     */
    init() {
        this.enfants.forEach(e => e.getMessageFromParent(MESSAGE.INIT));

        /*
        let nav = this.getEnfant("barrenav");
        if (nav instanceof CtrlNav){
            console.log("[CIMENT] J'ai bien récupéré mon CtrlNav");
        }*/
        //On affiche la barre de navigation
        //Ctrl.getMessageFromParent();
    }
}