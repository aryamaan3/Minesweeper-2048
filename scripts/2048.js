class Abs2048 extends Abs{
    constructor() {
        super();
    }

    init(){
        this.ctrl.getMessageFromAbstraction(MESSAGE.AFFICHETOI);

        // On ajoute le listener pour les flèches directionnelles
        document.addEventListener(
            "keydown",
            this.keydownHandler
            )
    }

    getMessage(message, pieceJointe){
        let result = "";
        switch (message){
            case MESSAGE.INIT2048:
                this.init();
                break;
            case MESSAGE.REMOVELISTENER:
                this.removeListener();
                break;
            default:
                result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }

    keydownHandler(event){
        switch (event.key) {
            case MESSAGE.UP:
                console.log("Keypressed vers le haut");
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.UP);
                break;
            case MESSAGE.DOWN:
                console.log("Keypressed vers le bas");
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.DOWN);
                break;
            case MESSAGE.RIGHT:
                console.log("Keypressed vers la droite");
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.RIGHT);
                break;
            case MESSAGE.LEFT:
                console.log("Keypressed vers la gauche");
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.LEFT);
                break;
        }
    }

    removeListener(){
        console.log("Supprimer listener 2048");
        document.removeEventListener("keydown", this.keydownHandler);
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
            case MESSAGE.KEYPRESSED:
                this.deplacement(pieceJointe);
                break;
        }
    }

    afficheGrille(){
        let header = document.getElementById('title');
        header.innerHTML = "2048";

        this.grille = new Grille2048();
        this.grille.construction();
    }

    deplacement(direction){
        //TODO
    }

}

class Ctrl2048 extends Ctrl{

    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        switch (message){
            case MESSAGE.INIT2048:
                this.abs.getMessage(message);
                break;
            case MESSAGE.REMOVELISTENER:
                this.abs.getMessage(message);
                break;
        }
    }

    getMessageFromAbstraction(message, piecejointe){
        switch (message){
            case MESSAGE.AFFICHETOI:
                this.pres.getMessage(message);
                break;
            case MESSAGE.KEYPRESSED:
                this.pres.getMessage(message, piecejointe);
                break;
        }
    }

    getMessageFromPresentation(message){
        //TODO
    }
}