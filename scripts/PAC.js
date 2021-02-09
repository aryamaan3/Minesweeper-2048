class MESSAGE {

}

class Abs {
    setCtrl(ctrl) {
        this.ctrl = ctrl;
    }

    recoitMessage(message, piecejointe) {
        console.error("recoitMessage de Abs pas encore implémentée : "+message);
    }
}



class Pres {
    setCtrl(ctrl) {
        this.ctrl = ctrl;

    }

    recoitMessage(message, piecejointe) {
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

    recoitMessageDeLAbstraction(message, piecejointe) {
        console.error("recoitMessageDeLAbstraction non impl : "+message);
    }

    recoitMessageDUnEnfant(message, piecejointe, ctrl) {
        console.error("recoitMessageDUnEnfant non impl : "+message);
    }

    recoitMessageDuParent(message, piecejointe) {
        console.error("recoitMessageDuParent non impl : "+message);
    }

    recoitMessageDeLaPresentation(message, piecejointe) {
        console.error("recoitMessageDeLaPresentation non impl : "+message);
    }

    addEnfant(controleur) {
        this.enfants.push(controleur);
        controleur.setParent(this);
    }

    removeEnfant(controleur) {
        this.enfants = this.enfants.filter(pac => pac !== controleur);
    }

    setParent(controleur) {
        this.parent = controleur;
    }

}
