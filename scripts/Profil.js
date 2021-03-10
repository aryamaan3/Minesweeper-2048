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
            //console.log('Profil recoit '+ message + "avec type: "+ pieceJointe.type + ", timer : "+pieceJointe.timer);
            this.addVicDem();

            /* pieceJointe ici c'est un objet :
            {type: 1, timer: "00:50" } avec type => 1: debutant, 2: intermédiaire, 3:expert
            */
            if(this.timerDemineur > pieceJointe.timer){   // On peut comparer les strings de cette façon puisque c'est formaté
                this.setTimer(MESSAGE.TIMER_DEMINEUR,pieceJointe.timer);
            }

            switch (pieceJointe.type){
                case 1:
                    // On vérifie si le trophée a déjà été distribué
                    let debutant = this.trophees.find( trophee => trophee.id === 'debutant');
                    if(!debutant){
                        const debutant = new Trophee("demineur", "debutant", "Gagner une partie en débutant","assets/trophées/trophee_debutant.png" );
                        this.addTrophee(debutant);
                    }

                    // On regarde si le timer < 1min au quel cas, on distribue un second trophée
                    let debutant1min = this.trophees.find( trophee => trophee.id === 'debutant1min');
                    if(!debutant1min && pieceJointe.timer < "01:00"){
                        const debutant1min = new Trophee("demineur", "debutant1min", "Gagner une partie en débutant en moins d'une minute","assets/trophées/trophee_1min.png" );
                        this.addTrophee(debutant1min);
                    }
                    break;
                case 2:
                    let intermediaire = this.trophees.find( trophee => trophee.id === 'intermediaire');
                    if(!intermediaire){
                        const intermediaire = new Trophee("demineur", "intermediaire", "Gagner une partie en intermediaire","assets/trophées/trophee_intermediaire.png" );
                        this.addTrophee(intermediaire);
                    }

                    let intermediaire2min = this.trophees.find( trophee => trophee.id === 'intermediaire2min');
                    if(!intermediaire2min && pieceJointe.timer < "02:00"){
                        const intermediaire2min = new Trophee("demineur", "intermediaire2min", "Gagner une partie en intermédiaire en moins de deux minutes","assets/trophées/trophee_2min.png" );
                        this.addTrophee(intermediaire2min);
                    }
                    break;
                case 3:
                    let expert = this.trophees.find( trophee => trophee.id === 'expert');
                    if(!expert){
                        const expert = new Trophee("demineur", "expert", "Gagner une partie en expert","assets/trophées/trophee_expert.png" );
                        this.addTrophee(expert);
                    }

                    let expert4min = this.trophees.find( trophee => trophee.id === 'expert4min');
                    if(!expert4min && pieceJointe.timer < "04:00"){
                        const expert4min = new Trophee("demineur", "expert4min", "Gagner une partie en expert en moins de quatre minutes","assets/trophées/trophee_4min.png" );
                        this.addTrophee(expert4min);
                    }
                    break;
            }
        }

        else if (message === MESSAGE.DEF_DEM){
            this.addDefDem();
        }
        /*----------- 2048 -----------*/
        else if (message === MESSAGE.DATA_PROFIL){
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
        this.timerDemineur = "";

        /* 2048 */
        this.meilleureTuile2048 = 2;
        this.nbPartie2048 = 0;
        this.score2048 = 0;
        this.timer2048 = "";

        /* Liste des trophées */
        this.trophees =[];
    }

    initPage(){
        /*-----------------------------TITRE--------------------------------*/
        /*let header = document.getElementById('title');
        header.innerHTML = "Profil";*/

        let container = document.createElement('div');
        container.id = "container";

        if (this.nbPartie2048 || this.vicDemineur || this.lossDem) { //si le joueur a déjà fait une partie

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
            let title = document.createElement('div');
            title.id = "title";
            title.innerHTML = "Demineur";
            demineur.appendChild(title);

            let timerDemineur = document.createElement('p');
            timerDemineur.id = "timerDemineur";
            timerDemineur.innerHTML = "Meilleur temps : " + this.timerDemineur;
            demineur.appendChild(timerDemineur);

            let pVic = document.createElement('p');
            pVic.id = "demineurVic";
            pVic.innerHTML = "Victoire(s) : " + this.vicDemineur;
            demineur.appendChild(pVic);

            let pLoss = document.createElement('p');
            pLoss.id = "demineurPertes";
            pLoss.innerHTML = "Defaite(s) : " + this.lossDem;
            demineur.appendChild(pLoss);

            let ratio = document.createElement('p');
            ratio.id = "ratio";
            let nb = ((this.vicDemineur / this.lossDem).toFixed(2)) || 0; // si nan alors affiche 0
            nb = (nb == Infinity) ? "stonks" : nb; // === fait false alors que == fait true
            ratio.innerHTML = "Ratio : " + nb;
            demineur.appendChild(ratio);

            scoreEtNiveaux.appendChild(demineur);

            /*-------------------------------2048------------------------------*/
            let j2048 = document.createElement('div');
            j2048.id = "Profil2048";

            let titre2048 = document.createElement('div');
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

            // SI BESOIN D'AFFICHER UN FAUX TROPHEE
            /*
            let trophee = new Trophee("2048", "test","1er trophée", "assets/trophées/trophee_1min.png")
            let tropheeHTML = trophee.render();
            trophees.appendChild(tropheeHTML);
            */

            if (!isEmpty(this.trophees[0]) || this.trophees[1]) { // s'affiche seulement si joueur a gagné des trophées
                /*----------------------------- TROPHEES ----------------------------*/
                let trophees = document.createElement("div");
                trophees.id = "trophees";
                trophees.innerHTML = "<p>Trophées</p>";


                // On boucle sur la liste des trophées afin de tous les afficher
                this.trophees.forEach(trophee => {
                    // il faut d'abord convertir le parsed JSON en un nouvel objet Trophee
                    let tropheeRevive = Trophee.revive(trophee);
                    // On a l'objet trophée, maintenant il faut en faire du HTML pour l'append
                    trophees.appendChild(tropheeRevive.render());
                });


                container.appendChild(trophees);
            }

        }
        else{ //si le joueur n'a pas fait de partie encore
            container.classList.add('vide');
            container.innerHTML = "<p>Veuillez jouer pour voir vos statistiques</p>"
        }

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