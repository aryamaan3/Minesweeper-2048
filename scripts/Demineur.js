class AbsDem extends Abs{
    constructor() {
        super();
        this.tabTuiles = [];
        this.longeur = 9;
        this.largeur = 9;
    }

    /**
     * assigne le bon dim selon niveau et appel genTab
     * @param niveau choisi
     */
    init(niveau){
        switch(niveau){
            case(1):
                this.genTab();
                break;

            case(2):
                this.longeur = 16;
                this.largeur = 16;
                this.genTab();
                break;

            case(3):
                this.longeur = 16;
                this.largeur = 30;
                this.genTab();
                break;

        }
    }

    getMessage(message, pieceJointe){
        let result = "";

        if (message === MESSAGE.NIVEAU){
            this.init(pieceJointe);
        }

        else if (message === MESSAGE.PREMIERCLICK){
            if (this.largeur === 9){
                this.genMines(9);
            }
            else if (this.largeur === 16){
                this.genMines(40);
            }
            else{
                this.genMines(99);
            }
        }

        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }

    /**
     * genere le tabTuiles
     * tous les tuiles sont cachés au debut et il n'y a pas de mines
     * les mines se genre apres le premier click
     */
    genTab(){
        for (let i = 0; i < this.largeur; i++){ //ligne
            this.tabTuiles[i] = []; //crée le deuxieme dim du tab
            for (let j = 0; j < this.longeur; j++){ //colonne
                this.tabTuiles[i][j] = new TuileAbs(i, j);
            }
        }
        console.log(this.tabTuiles);
    }

    /**
     * genere au hasard les mines en fonction du niveau
     * @param mines : number de mines à generer
     */
    genMines(mines){
        let  i, x, y;

        x = Math.floor(Math.random() *this.largeur);
        y = Math.floor(Math.random() *this.longeur);

        for (i = 0; i < mines; i++){
            if (this.tabTuiles[x][y].isMine()){
                x = Math.floor(Math.random() *this.largeur);
                y = Math.floor(Math.random() *this.longeur);
            }
            this.tabTuiles[x][y].setMine();
        }
        console.log(this.tabTuiles);
        this.countMine();
    }

    /**
     * compte le nb de mines dans le tab
     */
    countMine(){
        let acc = 0;
        for (let i = 0; i < this.largeur; i++){
            for (let j = 0; j < this.longeur; j++){
                if (this.tabTuiles[i][j].isMine()){
                    acc ++;
                }
            }
        }
        console.log(acc);
    }


}

class PresDem extends Pres{

    constructor() {
        super();
        this.ctx = undefined;
        this.grille = new Grille(true);
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

    getCtx(){
        return this.ctx;
    }

    setCtx(ctx){
        this.ctx = ctx;
    }

    /**
     * genere la page et la methode pour choisir le niveau
     */
    initPage(){
        let header = document.getElementById("title");
        header.innerHTML = "Démineur";
        this.selectLevel();
    }

    /**
     * crée des boutons qui donnent le choix de niveau à l'utilisateur
     */
    selectLevel(){
        let div = document.createElement('div');
        div.id = "container";
        div.classList.add('choose');
        document.body.appendChild(div);
        //on crée le div

        let h1 = document.createElement('h2');
        h1.innerHTML="choisissez votre niveau";
        h1.style.cssText = "text-align:center; margin:auto;";
        div.appendChild(h1);

        div.appendChild(document.createElement('br')); // saut de ligne

        let niv1 = document.createElement('button');
        niv1.innerHTML = "débutant";
        niv1.id = "1";
        niv1.classList.add('niveau');
        niv1.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1); //enleve tous les boutons afin de laisser la place à la grille
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 1); //communique le niveau au controleur
            this.grille.drawGrille(1, this); //dessine la grille
        };
        div.appendChild(niv1);

        let niv2 = document.createElement('button');
        niv2.innerHTML = "moyen";
        niv2.id = "2";
        niv2.classList.add('niveau');
        niv2.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 2);
            this.grille.drawGrille(2, this);
        };
        div.appendChild(niv2);

        let niv3 = document.createElement('button');
        niv3.innerHTML = "expert";
        niv3.id = "3";
        niv3.classList.add('niveau');
        niv3.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 3);
            this.grille.drawGrille(3, this);
        };
        div.appendChild(niv3);

    }

    /**
     * enleve les boutons
     * @param div
     * @param n1 bouton 1
     * @param n2 bouton 2
     * @param n3 bouton 2
     * @param h1 balise h1
     */
    removeButtons(div, n1, n2, n3, h1){
        div.style.removeProperty("position");
        div.style.removeProperty("top");
        div.style.removeProperty("left");
        div.style.removeProperty("text-align");

        div.removeChild(n1);
        div.removeChild(n2);
        div.removeChild(n3);
        div.removeChild(h1);
        document.body.removeChild(div)
    }

    /**
     * message venant de l'evenement click
     * envoi message au controleur
     * @param message
     */
    click(message){
        this.ctrl.getMessageFromPresentation(message);
    }

}

class CtrlDem extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.DEMINEUR){
            //console.log("in INIT");
            //this.abs.getMessage(message)
            this.pres.initPage();
        }
    }

    getMessageFromAbstraction(message){
        //TODO
    }

    getMessageFromPresentation(message, piecejointe){
        if (message === MESSAGE.NIVEAU){
            switch(piecejointe){
                case(1):
                    this.abs.getMessage(message, piecejointe);
                    break;

                case(2):
                    this.abs.getMessage(message, piecejointe);
                    break;

                case(3):
                    this.abs.getMessage(message, piecejointe);
                    break;

            }
        }

        else if (message === MESSAGE.PREMIERCLICK){
            this.abs.getMessage(message);
        }
    }
}