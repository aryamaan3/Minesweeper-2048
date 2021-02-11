class Abs2048 extends Abs{
    constructor() {
        super();
    }

    init(){
        //TODO
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

class Pres2048 extends Pres{
    constructor() {
        super();
        //this.grille = new Grille(false);
        this.grille = new Grille2048();
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

    initPage(){
        let header = document.getElementById('title');
        header.innerHTML = "2048";
        //this.grille.drawGrille();
        this.grille.construction();
    }
}

class Ctrl2048 extends Ctrl{

    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.INIT2048){
            //this.abs.getMessage(message)
            this.pres.initPage();
        }
    }

    getMessageFromAbstraction(message){
        //TODO
    }

    getMessageFromPresentation(message){
        //TODO
    }
}