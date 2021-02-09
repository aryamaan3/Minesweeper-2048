class absDem extends Abs{
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

class presDem extends Pres{
    constructor() {
        super();
        this.grille = new grille(10, 10, 50);
        this.grille.drawGrille();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

}

class ctrlDem extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.INIT){
            this.abs.getMessage(message)
            this.pres.drawGrille();
        }
    }
}