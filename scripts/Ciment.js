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
        this.header = document.getElementById('title');
        this.j2048 = this.enfants[0];
        this.demineur = this.enfants[1];
        this.profil = this.enfants[2];
    }

    recoitMessageDUnEnfant(message, piecejointe, ctrl) {
        if (message === MESSAGE.CHANGEPAGE) {
            switch (piecejointe) {
                case(MESSAGE.ACCUEIL):
                    this.header.innerHTML = "Site de jeux en ligne"
                    break;

                case(MESSAGE.PROFIL):
                    /*let profil = this.getEnfant(piecejointe);
                    console.log("resultat de getEnfant(profil) = "+ profil);*/
                    this.profil.getMessageFromParent(MESSAGE.PROFIL);
                    //envoi au controleur de profil
                    break;

                case(MESSAGE.DEMINEUR):
                    this.demineur.getMessageFromParent(MESSAGE.DEMINEUR);
                    //envoi au controleur de demineur
                    break;

                case(MESSAGE.INIT2048):
                    this.j2048.getMessageFromParent(MESSAGE.INIT2048);
                    //envoi au controleur de 2048
                    break;


            }
        } else if (message === MESSAGE.REMOVELISTENER) {
            // On dit à tous le monde d'enlever ses listeners
            //let j2048 = this.enfants[0];
            this.j2048.getMessageFromParent(MESSAGE.REMOVELISTENER);
            this.demineur.getMessageFromParent(MESSAGE.REMOVELISTENER);
            this.profil.getMessageFromParent(MESSAGE.REMOVELISTENER);
        }
        else if (message === MESSAGE.VIC_DEM) {
            this.profil.getMessageFromParent(message, piecejointe);
        }
        else if (message === MESSAGE.DEF_DEM) {
            this.profil.getMessageFromParent(message, piecejointe);
        }
        // ça c'était dans le code de Monsieur RENEVIER
        else super.recoitMessageDUnEnfant(message, piecejointe);
    }
}