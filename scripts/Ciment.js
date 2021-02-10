class AbsCiment extends Abs{
    constructor() {
        super();
    }

    getMessage(message, pieceJointe){
        //TODO
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
}