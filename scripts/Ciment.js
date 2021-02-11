class AbsCiment extends Abs{

    constructor() {
        super();
    }

    getMessage(message, pieceJointe){

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
    }

    recoitMessageDUnEnfant(message, piecejointe, ctrl) {
        if (message === MESSAGE.CHANGEPAGE) {
            console.log();
        }
        // ça c'était dans le code de Monsieur RENEVIER
        else super.reçoitMessageDUnEnfant(message, piecejointe);
    }
}