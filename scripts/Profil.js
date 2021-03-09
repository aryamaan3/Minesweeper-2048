class AbsProfil extends Abs{
    constructor() {
        super();
        this.vicDemineur = 0;
        this.defDemineur = 0;
        this.timerDemineur = "99:99";

        /* 2048 */
        this.meilleureTuile2048 = 2;
        this.nbPartie2048 = 0;
        this.score2048 = 0;
        this.timer2048 = "99:99";

        /* Liste des trophées */
        this.trophees = [];
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

        if (localStorage.getItem('timerDemineur')){
            this.timerDemineur = localStorage.getItem('timerDemineur');
            this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER_DEMINEUR, this.timerDemineur);
        }
        else {
            localStorage.setItem('timerDemineur', '99:99');
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
            this.timer2048 = localStorage.getItem('timer2048');
            this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER, this.timer2048);
        }
        else {
            localStorage.setItem('timer2048', '99:99');
        }

        // Nombre de partie
        if (localStorage.getItem('nbPartie2048')){
            this.nbPartie2048 = Number(localStorage.getItem('nbPartie2048'));
            this.ctrl.getMessageFromAbstraction(MESSAGE.NB_PARTIE_2048, this.nbPartie2048);
        }
        else {
            localStorage.setItem('nbPartie2048', '0');
        }


        /*  Trophées  */

        if (localStorage.getItem('trophees')){
            // JSON.parse puisqu'on a stocké un array d'objet !
            // TODO : vérifier que ça marche bien
            let json = JSON.parse( localStorage.getItem('trophees') );

            // Obligé de bouclé car sinon est reconnu comme étant une grosse chaine de caractère ...
            for (let i = 0; i < json.length ; i++){
                this.trophees.push(json[i]);
                //console.log(json[i]);
            }

            this.ctrl.getMessageFromAbstraction(MESSAGE.TROPHEE, this.trophees);
        }
        else {
            localStorage.setItem('trophees', JSON.stringify([{}]));
        }
    }

    getMessage(message, pieceJointe){
        let result = "";
        if (message === MESSAGE.INIT){
            this.init();
        }

        else if (message === MESSAGE.VIC_DEM){
            // TODO : vérifier ici les trophées
            this.addVicDem();

            // pieceJointe ici c'est 1: debutant, 2: intermédiaire, 3:expert

        }

        else if (message === MESSAGE.DEF_DEM){
            this.addDefDem();
        }
        /*----------- 2048 -----------*/
        else if (message === MESSAGE.DATA_PROFIL){
            // TODO : vérifier ici les trophées
            // Si le score de ce nouveau tour est supérieur à celui en localstorage
            if(this.score2048 < pieceJointe.score){
                this.setMeilleurScore(pieceJointe.score);
            }

            if(this.meilleureTuile2048 < pieceJointe.meilleureTuile){
                this.setMeilleureTuile(pieceJointe.meilleureTuile);

                // On donne un trophée pour la première fois que l'user atteint 128, 1024 ou 2048
                // pour que ça ne se fasse que la première fois, j'utilise pieceJointe et pas this.meilleureTuile
                if(pieceJointe.meilleureTuile === 128){
                    const trophee128 = new Trophee("2048", "tuile128","Obtenir une tuile 128", "assets/trophées/trophee_128.png");

                    // On l'ajoute au localstorage + liste trophees
                    this.addTrophee(trophee128);
                }
                else if (pieceJointe.meilleureTuile === 1024){
                    const trophee1024 = new Trophee("2048", "tuile1024", "Obtenir une tuile 1024", "assets/trophées/trophee_1024.png");
                    this.addTrophee(trophee1024);
                }
                else if (pieceJointe.meilleureTuile === 2048){
                    const trophee2048 = new Trophee("2048", "tuile2048","Obtenir une tuile 2048", "assets/trophées/trophee_2048.png");
                    this.addTrophee(trophee2048);
                }
            }
        }
        else if (message === MESSAGE.TIMER){
            // On recoit un nouveau timer, si on a fait moins de temps
            // que le précédent timer, on le localstorage
            if(this.timer2048 > pieceJointe){   // On peut comparer les strings de cette façon puisque c'est formaté
                this.setTimer(message,pieceJointe);
            }

            if(pieceJointe < "05:00"){
                let trophee5min = this.trophees.find( trophee => trophee.id === '5min2048');
                // si il n'a pas déjà été obtenu
                if(!trophee5min){
                    // On gagne le trophée "gagner une partie en moins de 5 min"
                    console.log("Pas de 5min");
                    const trophee5min2048 = new Trophee("2048", "5min2048", "Gagner une partie en moins de 5 min","assets/trophées/trophee_5min.png" );
                    this.addTrophee(trophee5min2048);
                }
            }
        }
        else if( message === MESSAGE.TIMER_DEMINEUR){
            // TODO : vérifier ici les trophées
            if(this.timerDemineur > pieceJointe){   // On peut comparer les strings de cette façon puisque c'est formaté
                this.setTimer(message,pieceJointe);
            }
        }
        else if (message === MESSAGE.NB_PARTIE_2048){
            this.addNbPartie2048();
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

    /*--------- 2048 ---------*/

    /**
     * Change le localstorage ET le variable de cette session
     * @param score (nouveau meilleur)
     */
    setMeilleurScore(score){
        //console.log("Exécution de setMeilleurScore");
        this.score2048 = score;

        // On change la valeur dans le localstorage
        localStorage.setItem('score2048', this.score2048);
        //console.log(this.score2048);

        // On envoie le nouveau score à afficher dans le Profil
        this.ctrl.getMessageFromAbstraction(MESSAGE.SCORE, this.score2048);
    }

    setMeilleureTuile(meilleureTuile){
        this.meilleureTuile2048 = meilleureTuile;
        localStorage.setItem('meilleureTuile2048', this.meilleureTuile2048);

        // On envoie le nouveau score à afficher dans le Profil
        this.ctrl.getMessageFromAbstraction(MESSAGE.MEILLEURE_TUILE, this.meilleureTuile2048);
    }

    setTimer(jeu, timer){
        switch (jeu){
            case MESSAGE.TIMER:
                // Pour 2048
                this.timer2048 = timer;
                localStorage.setItem('timer2048', this.timer2048);
                this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER, this.timer2048);
                break;
            case MESSAGE.TIMER_DEMINEUR:
                this.timerDemineur = timer;
                localStorage.setItem('timerDemineur', this.timerDemineur);
                this.ctrl.getMessageFromAbstraction(MESSAGE.TIMER_DEMINEUR, this.timerDemineur);
                break;
        }
    }

    addNbPartie2048(){
        this.nbPartie2048 ++;
        localStorage.setItem('nbPartie2048', this.nbPartie2048);

        this.ctrl.getMessageFromAbstraction(MESSAGE.NB_PARTIE_2048, this.nbPartie2048);
    }

    /* Trophées */
    addTrophee(trophee){
        this.trophees.push(trophee);

        localStorage.setItem('trophees', JSON.stringify(this.trophees));

        // On envoie ce trophée à la presentation
        this.ctrl.getMessageFromAbstraction(MESSAGE.TROPHEE, this.trophees);
    }
}

class PresProfil extends Pres{
    constructor() {
        super();
        this.vicDemineur = 0;
        this.lossDem = 0;
        this.timerDemineur = "99:99";

        /* 2048 */
        this.meilleureTuile2048 = 2;
        this.nbPartie2048 = 0;
        this.score2048 = 0;
        this.timer2048 = "99:99";

        /* Liste des trophées */
        this.trophees =[];
    }

    initPage(){
        /*-----------------------------TITRE--------------------------------*/
        let header = document.getElementById('title');
        header.innerHTML ="Profil";

        let container = document.createElement('div');
        container.id = "container";

        /*-----------------------------SCORE ET NIVEAUX----------------------------*/
        let scoreEtNiveaux = document.createElement('div');
        scoreEtNiveaux.id = "scoreEtNiveau";
        scoreEtNiveaux.classList.add('Profil');
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
        demineur.id = "ProfilDemineur";
        let title = document.createElement('h1');
        title.id = "title";
        title.innerHTML = "Demineur";
        demineur.appendChild(title);

        let timerDemineur = document.createElement('p');
        timerDemineur.id = "timerDemineur";
        timerDemineur.innerHTML = "Meilleur temps : " + this.timerDemineur;
        demineur.appendChild(timerDemineur);

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
        let nb = ((this.vicDemineur / this.lossDem).toFixed(2)) || 0; // si nan alors affiche 0
        nb = (nb == Infinity) ? "stonks" : nb; // === fait false alors que == fait true
        ratio.innerHTML = "Ratio : "+ nb;
        demineur.appendChild(ratio);

        scoreEtNiveaux.appendChild(demineur);

        /*-------------------------------2048------------------------------*/
        let j2048 = document.createElement('div');
        j2048.id = "Profil2048";

        let titre2048 = document.createElement('h1');
        titre2048.innerHTML = "2048";
        j2048.appendChild(titre2048);

        let timer2048 = document.createElement('p');
        timer2048.id = "timer2048";
        timer2048.innerHTML = "Meilleur temps : " + this.timer2048;
        j2048.appendChild(timer2048);

        let meilleureTuile2048 = document.createElement('p');
        meilleureTuile2048.id = "meilleureTuile";
        meilleureTuile2048.innerHTML = "Meilleure Tuile : " + this.meilleureTuile2048;
        j2048.appendChild(meilleureTuile2048);

        let meilleureScore2048 = document.createElement('p');
        meilleureScore2048.id = "meilleureScore2048";
        meilleureScore2048.innerHTML = "Score : " + this.score2048;
        j2048.appendChild(meilleureScore2048);

        let nbPartie2048 = document.createElement('p');
        nbPartie2048.id = "nbPartie2048";
        nbPartie2048.innerHTML = "Nombre de partie : " + this.nbPartie2048;
        j2048.appendChild(nbPartie2048);

        scoreEtNiveaux.appendChild(j2048);

        container.appendChild(scoreEtNiveaux);

        /*----------------------------- TROPHEES ----------------------------*/
        let trophees = document.createElement("div");
        trophees.id = "trophees";
        trophees.innerHTML = "<p>Trophées</p>";

        // SI BESOIN D'AFFICHER UN FAUX TROPHEE
        /*
        let trophee = new Trophee("2048", "test","1er trophée", "assets/trophées/trophee_1min.png")
        let tropheeHTML = trophee.render();
        trophees.appendChild(tropheeHTML);
        */

        // On boucle sur la liste des trophées afin de tous les afficher
        this.trophees.forEach( trophee => {
            // il faut d'abord convertir le parsed JSON en un nouvel objet Trophee
            let tropheeRevive = Trophee.revive(trophee);
            // On a l'objet trophée, maintenant il faut en faire du HTML pour l'append
            trophees.appendChild(tropheeRevive.render());
        });


        container.appendChild(trophees);

        document.body.appendChild(container);
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

        else if(message === MESSAGE.TIMER_DEMINEUR){
            this.setTimerDemineur(pieceJointe);
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

        /*----------- Trophées -----------*/
        else if(message === MESSAGE.TROPHEE){
            this.setTrophee(pieceJointe);
        }
    }

    setVictoireDem(nb){
        this.vicDemineur = nb;
    }

    setDefDem(nb){
        this.lossDem = nb;
    }

    setTimerDemineur(timer){
        this.timerDemineur = timer;
    }

    /*------------ 2048 -------------*/
    setMeilleureTuile(pieceJointe) {
        this.meilleureTuile2048 = pieceJointe;
    }

    setScore(score) {
        this.score2048 = score;
    }

    setTimer(timer) {
        this.timer2048 = timer;
    }

    setNbPartie2048(nbPartie) {
        this.nbPartie2048 = nbPartie;
    }

    /* Trophée */

    setTrophee(trophees){
        this.trophees = trophees;
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

        else if (message === MESSAGE.VIC_DEM
                || message === MESSAGE.TIMER_DEMINEUR){
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
            //console.log(pieceJointe);
        }
    }

    getMessageFromAbstraction(message, pieceJointe){
        this.pres.getMessage(message, pieceJointe);
    }

    getMessageFromPresentation(message){
        //TODO
    }
}