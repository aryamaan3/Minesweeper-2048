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
            switch(piecejointe){
                case(MESSAGE.ACCUEIL):
                    let header = document.getElementById('title');
                    header.innerHTML = "Site de jeux en ligne"
                    break;

                case(MESSAGE.PROFIL):
                    /*let profil = this.getEnfant(piecejointe);
                    console.log("resultat de getEnfant(profil) = "+ profil);*/
                    let profil = this.enfants[2];
                    profil.getMessageFromParent(MESSAGE.PROFIL);
                    //envoi au controleur de profil
                    break;

                case(MESSAGE.DEMINEUR):
                    let demineur = this.enfants[1];
                    demineur.getMessageFromParent(MESSAGE.DEMINEUR);
                    //envoi au controleur de demineur
                    break;

                case(MESSAGE.INIT2048):
                    let jeu1 = this.enfants[0];
                    jeu1.getMessageFromParent(MESSAGE.INIT2048);
                    //envoi au controleur de 2048
                    break;


            }
        }
        // ça c'était dans le code de Monsieur RENEVIER
        else super.recoitMessageDUnEnfant(message, piecejointe);
    }
}