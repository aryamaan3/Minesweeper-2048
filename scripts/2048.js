class Abs2048 extends Abs{
    constructor() {
        super();
    }

    init(){
        this.ctrl.getMessageFromAbstraction(MESSAGE.AFFICHETOI);
    }

    getMessage(message, pieceJointe){
        let result = "";
        if (message === MESSAGE.INIT2048){
            this.init();
        }
        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }
}

class Pres2048 extends Pres{
    constructor() {
        super();
        //this.grille = new Grille(false);
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        switch (message){
            case MESSAGE.AFFICHETOI:
                this.afficheGrille();
                break;
        }
    }

    afficheGrille(){
        let header = document.getElementById('title');
        header.innerHTML = "2048";

        this.grille = new Grille2048();
        this.grille.construction();
    }
}

class Ctrl2048 extends Ctrl{

    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.INIT2048){
            this.abs.getMessage(message);
            //this.pres.initPage();
        }
    }

    getMessageFromAbstraction(message){
        switch (message){
            case MESSAGE.AFFICHETOI:
                this.pres.getMessage(message);
        }
    }

    getMessageFromPresentation(message){
        //TODO
    }
}