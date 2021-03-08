class MESSAGE {
    static INIT = "initialisation";
    static CHANGEPAGE = "changementpage";
    static ACCUEIL = "accueil";
    static DEMINEUR = "demineur";
    static INIT2048 = "2048";
    static PROFIL = "profil";
    static AFFICHETOI = "affichetoi";
    static HIGHLIGHT = "highlight";
    static NIVEAU = "niveau";
    static PREMIERCLICK = "premierrClick"
    static CLICK = "click";
    static KEYPRESSED = "keypressed";
    static UP = "ArrowUp";
    static DOWN = "ArrowDown";
    static RIGHT = "ArrowRight";
    static LEFT = "ArrowLeft";
    static REMOVELISTENER = "removelistener";
    static DECOUVRE ="decouvreTuile";
    static VIC_DEM = "victoire";
    static MINE = "mine";
    static DEF_DEM = "perte";
    static INDICE = "indice";
    static CLIC_DROIT = "clickDroit"
    static CLEAR_CONTAINER = "clearcontainer";
    static SCORE = "score";
    static MINES_RESTANT = "mines_restants";
    static MEILLEURE_TUILE = "meilleuretuile";
    static TIMER = "timer";
    static TIMER_DEMINEUR = "timerDemineur";
    static NB_PARTIE_2048 = "nbpartie2048";
    static TOUR = "tour";
    static DATA_PROFIL = "dataprofil";
    static REM_DRAPEAU = "removeDrapeau";
    static TROPHEE = "trophee";
}

class Abs {
    setCtrl(ctrl) {
        this.ctrl = ctrl;
    }

    recoitMessage(message) {
        console.error("recoitMessage de Abs pas encore implémentée : "+message);
    }
}



class Pres {
    setCtrl(ctrl) {
        this.ctrl = ctrl;

    }

    recoitMessage(message) {
        console.error("recoitMessage de Pres pas encore implémentée : "+message);
    }

}


class Ctrl  {
    constructor(abs, pres) {
        this.abs = abs;
        this.abs.setCtrl(this);
        this.pres = pres;
        this.pres.setCtrl(this);

        this.parent = null;
        this.enfants = [];
    }

    recoitMessageDeLAbstraction(message) {
        console.error("recoitMessageDeLAbstraction non impl : "+message);
    }

    recoitMessageDUnEnfant(message, piecejointe, ctrl) {
        console.error("recoitMessageDUnEnfant non impl : "+message);
    }

    recoitMessageDuParent(message, ctrl) {
        console.error("recoitMessageDuParent non impl : "+message + " "+ ctrl);
    }

    recoitMessageDeLaPresentation(message) {
        console.error("recoitMessageDeLaPresentation non impl : "+message);
    }

    addEnfant(controleur) {
        this.enfants.push(controleur);
        controleur.setParent(this);
    }

    setParent(controleur) {
        this.parent = controleur;
    }

}
