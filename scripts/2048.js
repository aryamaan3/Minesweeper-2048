class Abs2048 extends Abs{
    constructor() {
        super();

        this.meilleureTuile = 2;
        this.score = 0;
        this.nbTour = 0;
        // Quand 2048 est atteint, on a une victoire mais on peut continuer
        this.victoire = false;
        this.fin = false;
    }

    /**
     * Est appelée par Ciment au moment d'un changement de page
     */
    init(){
        this.ctrl.getMessageFromAbstraction(MESSAGE.AFFICHETOI);

        this.listener = e => {
            this.keydownHandler(e);
        }
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
            case MESSAGE.TOUR:
                this.tour(pieceJointe);
                break;
            case MESSAGE.FIN_2048:
                this.finirPartie();
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
                // On ne veut pas que l'user se déplace dans la page si il utilise ses flèches
                event.preventDefault();
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.UP);
                break;
            case MESSAGE.DOWN:
                event.preventDefault();
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.DOWN);
                break;
            case MESSAGE.RIGHT:
                event.preventDefault();
                this.ctrl.getMessageFromAbstraction(MESSAGE.KEYPRESSED,MESSAGE.RIGHT);
                break;
            case MESSAGE.LEFT:
                event.preventDefault();
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

    /**
     *
     * @param data score, meilleure tuile et nbTour reçu de la présentation
     */
    tour(data){
        // A chaque tour effectué dans la présentation, on récupère les données importantes
        this.meilleureTuile = data.meilleureTuile;
        this.score = data.score;
        this.nbTour = data.nbTour;

        // On vérifie si on a une victoire
        if(this.meilleureTuile >= 2048 && this.victoire === false){
            this.victoire = true;

            // Il faut envoyer une demande de Timer au ciment qui le transmettra au profil
            this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER);
        }

        // On maj les données du profil et de la barre de score
        this.ctrl.getMessageFromAbstraction(MESSAGE.DATA_PROFIL, {
            score:this.score,
            meilleureTuile:this.meilleureTuile
        });
    }

    /**
     * Envoie le signal de fin de partie à Ciment
     */
    finirPartie() {
        this.ctrl.getMessageFromAbstraction(MESSAGE.FIN_2048);
    }
}

class Pres2048 extends Pres{
    constructor() {
        super();
        //this.grille = new Grille(false);
        //this.initPage();

        // ON stocke ici le nombre de tour valide qui se sont écoulés
        this.nbTour = 0;

        // N'est pas stocké ici mais dans Grille2048
        this.score = 0;
        this.meilleureTuile = 2;

        this.fin = false;
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

    /**
     * Déclenchée par MESSAGE.AFFICHETOI à l'initialisation de la page
     */
    afficheGrille(){
        //let header = document.getElementById('title');
        //header.innerHTML = "2048";
        this.fin = false;

        this.grille = new Grille2048();
        this.grille.construction();
    }

    /**
     * Va effectuer un tour, si celui ci est permis, et envoie des données à l'abstraction
     * @param direction
     */
    deplacement(direction){
        // Si le tour est valide, on compte un tour supplémentaire
        // et on vérifie que le score n'est pas changé
        if(this.grille.nouveauTour(direction)){
            this.nbTour ++;

            // On MAJ le score
            if(this.score !== this.grille.getScore()){
                this.score = this.grille.getScore();
                //console.log(this.score);
                // On envoie le nouveau score pour l'affichage dans Ciment
            }

            // On MAJ la meilleure tuile
            this.meilleureTuile = this.grille.getMeilleureTuile();

            // On prévient l'abstraction des évolutions
            this.ctrl.getMessageFromPresentation(MESSAGE.TOUR, {
                nbTour:this.nbTour,
                score:this.score,
                meilleureTuile:this.meilleureTuile
            });

        }
        else if( !this.grille.mouvementPossible(MESSAGE.UP)
                && !this.grille.mouvementPossible(MESSAGE.DOWN)
                && !this.grille.mouvementPossible(MESSAGE.RIGHT)
                && !this.grille.mouvementPossible(MESSAGE.LEFT)
                && !this.fin){
            // Aucun déplacement possible, on est bloqué : fin de partie
            this.fin = true;
            this.ctrl.getMessageFromPresentation(MESSAGE.FIN_2048);
            this.affichePanneau();
        }

    }

    /**
     * Génère le html du panneau de fin de partie (lorsqu'on ne peut plus bouger de tuile
     */
    affichePanneau(){
        let container = document.getElementById("container");

        let panneau = document.createElement("div");
        panneau.id = "panneauFin";
        panneau.innerHTML = "PARTIE TERMINÉE";

        container.appendChild(panneau);
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
            case MESSAGE.DATA_PROFIL:
                // A chaque tour, on MAJ nos données dans le profil
                this.parent.recoitMessageDUnEnfant(message, pieceJointe);
                break;
            case MESSAGE.TIMER:
                this.parent.recoitMessageDUnEnfant(message);
                break;
            case MESSAGE.FIN_2048:
                this.parent.recoitMessageDUnEnfant(message);
                break;
        }
    }

    getMessageFromPresentation(message, pieceJointe){
        switch (message){
            case MESSAGE.TOUR:
                this.abs.getMessage(message, pieceJointe);
                break;
            case MESSAGE.FIN_2048:
                this.abs.getMessage(message, pieceJointe);
                break;
        }
    }
}