class AbsProfil extends Abs{
    constructor() {
        super();
        this.vicDemineur = 0;
        this.defDemineur = 0;
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
        this.vic2048 = 0;
        this.loss2048 = 0;
    }

    initPage(){
        /*-----------------------------TITRE--------------------------------*/
        let header = document.getElementById('title');
        header.innerHTML ="Profil";

        /*-----------------------------CONTAINER----------------------------*/
        let div = document.createElement('div');
        div.id = "container";
        let h = document.createElement('h1');
        h.id = "total";
        h.innerHTML = "Vous avez joué à : "+ (this.vicDemineur + this.vic2048 + this.lossDem + this.loss2048) + " partie(s)";
        div.appendChild(h);

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

        /*-------------------------------2048------------------------------*/
        let deuxMille = document.createElement('div');
        deuxMille.id = "2048";
        //TODO

        div.appendChild(deuxMille);
        div.appendChild(demineur);
        document.body.appendChild(div);

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
    }

    setVictoireDem(nb){
        this.vicDemineur = nb;
    }

    setDefDem(nb){
        this.lossDem = nb;
    }

}

class CtrlProfil extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message, piecejointe){
        if (message === MESSAGE.PROFIL){
            this.pres.getMessage(message);
        }

        else if(message === MESSAGE.INIT){
            this.abs.getMessage(message);
        }

        else if (message === MESSAGE.VIC_DEM){
            this.abs.getMessage(message, piecejointe);
        }

        else if (message === MESSAGE.DEF_DEM){
            this.abs.getMessage(message, piecejointe);
        }
    }

    getMessageFromAbstraction(message, piecejointe){
        this.pres.getMessage(message, piecejointe);
    }

    getMessageFromPresentation(message){
        //TODO
    }
}