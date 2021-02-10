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
        this.grille = new Grille(5, 5, 25);
        this.grille.drawGrille();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

}

class CtrlDem extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.INIT){
            this.abs.getMessage(message)
            //this.pres.drawGrille();
        }
    }
}