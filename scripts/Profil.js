class AbsProfil extends Abs{
    constructor() {
        super();
        this.vicDemineur = 0;
        this.defDemineur = 0;

        /* 2048 */
        this.meilleureTuile2048 = 2;
        this.nbPartie2048 = 0;
        this.score2048 = 0;
        this.timer2048 = "00:00";
    }

    init(){
        if (localStorage.getItem('vicDem')){
            this.vicDemineur = Number(localStorage.getItem('vicDem'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.VIC_DEM, this.vicDemineur);
        }
        else {
            localStorage.setItem('vicDem', '0');
        }

        if (localStorage.getItem('defDem')){
            this.defDemineur = Number(localStorage.getItem('defDem'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.DEF_DEM, this.defDemineur);
        }
        else {
            localStorage.setItem('defDem', '0');
        }


        /* 2048 */
        // On vérifie si nos variables sont déjà définies dans localstorage
        // sinon on les créées
        if (localStorage.getItem('meilleureTuile2048')){
            this.meilleureTuile2048 = Number(localStorage.getItem('meilleureTuile2048'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.MEILLEURE_TUILE, this.meilleureTuile2048);
        }
        else {
            localStorage.setItem('meilleureTuile2048', '2');
        }

        // Score
        if (localStorage.getItem('score2048')){
            this.score2048 = Number(localStorage.getItem('score2048'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.SCORE, this.score2048);
        }
        else {
            localStorage.setItem('score2048', '0');
        }

        // Timer
        if (localStorage.getItem('timer2048')){
            this.timer2048 = Number(localStorage.getItem('timer2048'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER, this.timer2048);
        }
        else {
            localStorage.setItem('timer2048', '00:00');
        }

        // Nombre de partie
        if (localStorage.getItem('nbPartie2048')){
            this.nbPartie2048 = Number(localStorage.getItem('nbPartie2048'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.NB_PARTIE_2048, this.nbPartie2048);
        }
        else {
            localStorage.setItem('nbPartie2048', '0');
        }
    }

    getMessage(message, pieceJointe){
        let result = "";
        if (message === MESSAGE.INIT){
            this.init();
        }

        else if (message === MESSAGE.VIC_DEM){
            this.addVicDem();
        }

        else if (message === MESSAGE.DEF_DEM){
            this.addDefDem();
        }
        /*----------- 2048 -----------*/
        else if (message === MESSAGE.DATA_PROFIL){
            //TODO
        }
        else if (message === MESSAGE.TIMER){

        }
        else if (message === MESSAGE.NB_PARTIE_2048){

        }
        /*----- Si message pas connu ------*/
        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }

    addVicDem(){
        localStorage.removeItem('vicDem');
        this.vicDemineur ++;
        localStorage.setItem('vicDem', this.vicDemineur);
        this.ctrl.getMessageFromAbstraction(MESSAGE.VIC_DEM, this.vicDemineur);
    }

    addDefDem(){
        localStorage.removeItem('defDem');
        this.defDemineur ++;
        localStorage.setItem('defDem', this.defDemineur);
        this.ctrl.getMessageFromAbstraction(MESSAGE.DEF_DEM, this.defDemineur);
    }
}

class PresProfil extends Pres{
    constructor() {
        super();
        this.vicDemineur = 0;
        this.lossDem = 0;

        /* 2048 */
        this.meilleureTuile2048 = 2;
        this.nbPartie2048 = 0;
        this.score2048 = 0;
        this.timer2048 = "00:00";
    }

    initPage(){
        /*-----------------------------TITRE--------------------------------*/
        let header = document.getElementById('title');
        header.innerHTML ="Profil";

        /*-----------------------------SCORE ET NIVEAUX----------------------------*/
        let scoreEtNiveaux = document.createElement('div');
        scoreEtNiveaux.id = "score";
        scoreEtNiveaux.innerHTML = "<p>Score et niveaux</p>";

        /*
        let div = document.createElement('div');
        div.id = "container";
        let h = document.createElement('h1');
        h.id = "total";
        h.innerHTML = "Vous avez joué à : "+ (this.vicDemineur + this.vic2048 + this.lossDem + this.loss2048) + " partie(s)";
        div.appendChild(h);
        */

        /*----------------------------DEMINEUR------------------------------*/
        let demineur = document.createElement('div');
        demineur.id = "demineur";
        let title = document.createElement('h1');
        title.id = "title";
        title.innerHTML = "Demineur";
        demineur.appendChild(title);

        let pVic = document.createElement('p');
        pVic.id = "demineurVic";
        pVic.innerHTML = "Victoire(s) : "+ this.vicDemineur;
        demineur.appendChild(pVic);

        let pLoss = document.createElement('p');
        pLoss.id = "demineurPertes";
        pLoss.innerHTML = "Defaite(s) : "+this.lossDem;
        demineur.appendChild(pLoss);

        let ratio = document.createElement('p');
        ratio.id ="ratio";
        ratio.innerHTML = "Ratio : "+ ((this.vicDemineur / this.lossDem).toFixed(2)) || 0; // si nan alors affiche 0
        demineur.appendChild(ratio);

        scoreEtNiveaux.appendChild(demineur);

        /*-------------------------------2048------------------------------*/
        let j2048 = document.createElement('div');
        j2048.id = "2048";

        let titre2048 = document.createElement('p');
        titre2048.innerHTML = "2048";
        demineur.appendChild(titre2048);

        let timer2048 = document.createElement('p');
        timer2048.id = "timer2048";
        j2048.appendChild(timer2048);

        let meilleureTuile2048 = document.createElement('p');
        meilleureTuile2048.id = "meilleureTuile";
        j2048.appendChild(meilleureTuile2048);

        let meilleureScore2048 = document.createElement('p');
        meilleureScore2048.id = "meilleureScore2048";
        j2048.appendChild(meilleureScore2048);

        let nbPartie2048 = document.createElement('p');
        nbPartie2048.id = "nbPartie2048";
        j2048.appendChild(nbPartie2048);

        scoreEtNiveaux.appendChild(j2048);


        document.body.appendChild(scoreEtNiveaux);
    }

    getMessage(message, pieceJointe){
        if (message === MESSAGE.VIC_DEM){
            this.setVictoireDem(pieceJointe);
        }

        else if (message === MESSAGE.PROFIL){
            this.initPage();
        }

        else if (message === MESSAGE.DEF_DEM){
            this.setDefDem(pieceJointe);
        }

        /*----------- 2048 -----------*/
        else if (message === MESSAGE.MEILLEURE_TUILE){
            this.setMeilleureTuile(pieceJointe);
        }
        else if (message === MESSAGE.SCORE){
            this.setScore(pieceJointe);
        }
        else if (message === MESSAGE.TIMER){
            this.setTimer(pieceJointe);
        }
        else if (message === MESSAGE.NB_PARTIE_2048){
            this.setNbPartie2048(pieceJointe);
        }
    }

    setVictoireDem(nb){
        this.vicDemineur = nb;
    }

    setDefDem(nb){
        this.lossDem = nb;
    }

    /*------------ 2048 -------------*/
    setMeilleureTuile(pieceJointe) {
        this.meilleureTuile2048 = pieceJointe;
    }

    setScore(pieceJointe) {
        this.score2048 = pieceJointe;
    }

    setTimer(pieceJointe) {
        this.timer2048 = pieceJointe;
    }

    setNbPartie2048(pieceJointe) {
        this.nbPartie2048 = pieceJointe;
    }
}

class CtrlProfil extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message, pieceJointe){
        if (message === MESSAGE.PROFIL){
            this.pres.getMessage(message);
        }

        else if(message === MESSAGE.INIT){
            this.abs.getMessage(message);
        }

        else if (message === MESSAGE.VIC_DEM){
            this.abs.getMessage(message, pieceJointe);
        }

        else if (message === MESSAGE.DEF_DEM){
            this.abs.getMessage(message, pieceJointe);
        }

        /*------------ 2048 -------------*/
        else if (message === MESSAGE.DATA_PROFIL
                    || message === MESSAGE.TIMER
                    || message === MESSAGE.NB_PARTIE_2048){
            this.abs.getMessage(message, pieceJointe);
            console.log(pieceJointe);
        }
    }

    getMessageFromAbstraction(message, piecejointe){
        this.pres.getMessage(message, piecejointe);
    }

    getMessageFromPresentation(message){
        //TODO
    }
}