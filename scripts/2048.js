class Abs2048 extends Abs{
    constructor() {
        super();
    }

    /**
     * Est appelée par Ciment au moment d'un changement de page
     */
    init(){
        this.ctrl.getMessageFromAbstraction(MESSAGE.AFFICHETOI);

        this.listener = e => { this.keydownHandler(e) }
        // On ajoute le listener pour les flèches directionnelles
        document.addEventListener(
            "keydown",
            /* Ici, je ne peux pas faire this.keydownHandler car
            * JS fait une copie de cette fonction et lors de l'exécution
            * les appels en "this." ne réfèrent la classe actuelle (Abs2048)
            * mais la fonction !
            */
            this.listener
            )
    }

    /**
     * Permet à Abs2048 de recevoir un message de la part de son contrôleur
     * @param message
     * @param pieceJointe
     * @returns {string}
     */
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

    /**
     * Handler du signal "keydown" lorsque la page de 2048 est load
     * @param event, donné par le addEventListener en paramètre à cette callback function
     */
    keydownHandler(event){
        switch (event.key) {
            case MESSAGE.UP:
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.UP);
                break;
            case MESSAGE.DOWN:
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.DOWN);
                break;
            case MESSAGE.RIGHT:
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.RIGHT);
                break;
            case MESSAGE.LEFT:
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.LEFT);
                break;
        }
    }

    /**
     * Et appelé par ciment lors du changement de page à l'aide du message REMOVELISTENER
     */
    removeListener(){
        document.removeEventListener("keydown", this.listener);
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
        this.grille.nouveauTour(direction);
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

    getMessageFromAbstraction(message, pieceJointe){
        switch (message){
            case MESSAGE.AFFICHETOI:
                this.pres.getMessage(message);
                break;
            case MESSAGE.KEYPRESSED:
                this.pres.getMessage(message, pieceJointe);
                break;
        }
    }

    getMessageFromPresentation(message){
        //TODO
    }
}