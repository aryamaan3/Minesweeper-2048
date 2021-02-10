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
    }

    getMessage(message, pieceJointe){
        //TODO
    }
}

class Ctrl2048 extends Ctrl{

    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.INIT){
            this.abs.getMessage(message)
        }
    }
}