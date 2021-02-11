class AbsProfil extends Abs{
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

class PresProfil extends Pres{
    constructor() {
        super();
    }

    initPage(){
        let header = document.getElementById('title');
        header.innerHTML ="Profil";
    }

    getMessage(message, pieceJointe){
        //TODO
    }
}

class CtrlProfil extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.PROFIL){
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