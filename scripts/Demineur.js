class AbsDem extends Abs{
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

class PresDem extends Pres{

    constructor() {
        super();
        this.grille = new Grille();
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

    initPage(){
        let header = document.getElementById("title");
        header.innerHTML = "Démineur";
        this.grille.drawGrille(true);
    }

}

class CtrlDem extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.DEMINEUR){
            console.log("in INIT");
            this.abs.getMessage(message)
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