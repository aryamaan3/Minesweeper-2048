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
        this.time = 0;
        this.timer = undefined;
    }


    getMessage(message, pieceJointe){
        if(message === MESSAGE.CHANGEPAGE){
            this.removeStats();
            if(pieceJointe === MESSAGE.INIT2048) {
                this.initStats(pieceJointe);
            }
            else if (message === MESSAGE.DEMINEUR){
                this.removeStats();
            }
        }
        else if (message === MESSAGE.DEMINEUR){
            this.removeStats();
            this.initStats(message);
            if (pieceJointe){ //cas où c'est le bouton nouvelle partie qui a été utilisé
                this.removeStats();
            }
        }
        else if (message === MESSAGE.SCORE){
            this.changeScore(pieceJointe);
        }
        else if (message === MESSAGE.MINES_RESTANT){
            this.changeMines(pieceJointe);
        }
    }

    initStats(message){
        let barreNav = document.getElementById("barrenav");

        let barreStats = document.createElement("div");
        barreStats.id = "barrestats";

        let timer = document.createElement("div");
        timer.id = "timer";
        timer.innerHTML = "00:00";
        this.startTimer();
        barreStats.appendChild(timer);

        // Si c'est le démineur, on affiche un un compteur de mines restantes
        if(message === MESSAGE.DEMINEUR) {
            let nbMines = document.createElement("div");
            nbMines.id = "compteurmines";
            nbMines.innerHTML = "0";
            barreStats.appendChild(nbMines);
            this.ctrl.recoitMessageDeLaPresentation(MESSAGE.MINES_RESTANT);
        }
        // Si c'est 2048, le compteur de mine est remplacé par un compteur de score
        else if(message === MESSAGE.INIT2048){
            let score = document.createElement("div");
            score.id = "score";
            score.innerHTML = "0";
            barreStats.appendChild(score);
        }

        let boutonNouvellePartie = document.createElement("div");
        boutonNouvellePartie.id = "nouvellepartie";
        boutonNouvellePartie.innerHTML = "NOUVELLE PARTIE";
        boutonNouvellePartie.addEventListener("click", () => {
            // Comme dans la barre navigation, il faut donner l'ordre de nettoyer le container
            this.ctrl.recoitMessageDeLaPresentation(MESSAGE.CLEAR_CONTAINER);
            this.ctrl.recoitMessageDeLaPresentation(message);
        });
        barreStats.appendChild(boutonNouvellePartie);

        barreNav.insertAdjacentElement('afterend', barreStats);
    }

    startTimer() {
        // setInterval is a built-in function that will call the given function
        // every N milliseconds (1 second = 1000 ms)
        this.timer = setInterval(() => {
            this.time += 1;

            let timer = document.getElementById("timer");

            timer.innerHTML = this.formatTimer(this.time);
        }, 1000);
    }

    /**
     * A appeller lors du game over
     */
    stopTimer(){
        //TODO : appeler dans le game over des jeux
        this.time = 0;
        clearInterval(this.timer);
    }

    /**
     * Transforme le temps de seconde à un timer type "02:40"
     * @param secondes
     * @return {string} Timer type "02:40"
     */
    formatTimer(secondes){
        let sec = secondes % 60;
        let min = Math.floor(secondes / 60);
        return ("0" + min).slice(-2) +":"+("0" + sec).slice(-2);
    }

    /**
     * Supprime la barre de statistiques dans les cas où on n'en a pas besoin
     * (Profil et Accueil par exemple)
     */
    removeStats() {
        this.stopTimer();
        let barreStats = document.getElementById("barrestats");
        if(barreStats){
            document.body.removeChild(barreStats);
        }
    }

    /**
     * Permet de modifier l'affichage du score en fonction de ce que renvoie les jeux
     * @param score
     */
    changeScore(score) {
        let scoreDiv = document.getElementById("score");
        scoreDiv.innerHTML = score;
    }

    /**
     * permet de modifier le nb de mines restant affiché
     * @param mines
     */
    changeMines(mines){
        try{
            let scoreDiv = document.getElementById("compteurmines");
            scoreDiv.innerHTML = mines;}
        catch (erreur) {
            console.log("barreStats pas encore crée");
        }
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
        this.nav = this.enfants[3];
    }

    recoitMessageDUnEnfant(message, piecejointe, ctrl) {
        if (message === MESSAGE.CHANGEPAGE) {

            switch (piecejointe) {
                case(MESSAGE.ACCUEIL):
                    this.header.innerHTML = "Site de jeux en ligne"
                    this.pres.getMessage(message);
                    break;

                case(MESSAGE.PROFIL):
                    /*let profil = this.getEnfant(piecejointe);
                    console.log("resultat de getEnfant(profil) = "+ profil);*/
                    this.profil.getMessageFromParent(MESSAGE.PROFIL);
                    this.pres.getMessage(message);
                    //envoi au controleur de profil
                    break;

                case(MESSAGE.DEMINEUR):
                    this.demineur.getMessageFromParent(MESSAGE.DEMINEUR);
                    this.pres.getMessage(message, piecejointe);
                    //envoi au controleur de demineur
                    break;

                case(MESSAGE.INIT2048):
                    this.j2048.getMessageFromParent(MESSAGE.INIT2048);
                    this.pres.getMessage(message, piecejointe);
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
        else if (message === MESSAGE.SCORE){
            // Permet d'afficher le nouveau score dans la barre de stats
            this.pres.getMessage(message, piecejointe);
        }
        else if (message === MESSAGE.DEMINEUR){
            this.pres.getMessage(message);
        }
        else if (message === MESSAGE.MINES_RESTANT){
            this.pres.getMessage(message, piecejointe);
        }
        // ça c'était dans le code de Monsieur RENEVIER
        else super.recoitMessageDUnEnfant(message, piecejointe);
    }

    recoitMessageDeLaPresentation(message) {
        switch (message){
            case MESSAGE.DEMINEUR:
                this.demineur.getMessageFromParent(MESSAGE.DEMINEUR);
                this.pres.getMessage(message, MESSAGE.CLEAR_CONTAINER);
                break;
            case MESSAGE.INIT2048:
                this.j2048.getMessageFromParent(MESSAGE.INIT2048);
                break;
            case MESSAGE.CLEAR_CONTAINER:
                // Pour supprimer l'ancien container
                this.nav.getMessageFromParent(message);
                break;

            case MESSAGE.MINES_RESTANT:
                //demande nbMines à demineur
                this.demineur.getMessageFromParent(message);
        }
        //super.recoitMessageDeLaPresentation(message);
    }
}