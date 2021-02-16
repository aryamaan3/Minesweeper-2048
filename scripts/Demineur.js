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
            console.log("premier click called");
            if (this.largeur === 9){
                this.genMines(9, pieceJointe);
            }
            else if (this.largeur === 16){
                this.genMines(40, pieceJointe);
            }
            else{
                this.genMines(99, pieceJointe);
            }
        }

        else if (message === MESSAGE.CLICK){
            console.log("click called");
            let posx = Math.floor(pieceJointe[0] / 30); //on le convertis aux indices d'un tab
            let posy = Math.floor(pieceJointe[1] / 30);
            this.tuileClicked(posx, posy)
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
    }

    /**
     * genere au hasard les mines en fonction du niveau
     * @param mines : number de mines à generer
     * @param coord tab des coordonnées x et y du click souris sur le canvas
     */
    genMines(mines, coord){
        let  i, x, y;
        let coordX = Math.floor(coord[0] / 30); //on le convertis aux indices d'un tab
        let coordY = Math.floor(coord[1] / 30);

        x = Math.floor(Math.random() *this.largeur);
        y = Math.floor(Math.random() *this.longeur);

        for (i = 0; i < mines; i++){
            while ((this.tabTuiles[x][y].isMine()) || (x === coordX && y === coordY)){
                x = Math.floor(Math.random() *this.largeur);
                y = Math.floor(Math.random() *this.longeur);
            }
            this.tabTuiles[x][y].setMine();
        }
        if (this.countMine() != mines){
            console.log("erreur sur nb de mines genérés");
        }

        let pos = [];
        pos[0] = coordX;
        pos[1] = coordY;

        this.ctrl.getMessageFromAbstraction(MESSAGE.DECOUVRE, pos)
        this.ctrl.getMessageFromAbstraction(MESSAGE.VICTOIRE);
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
        return acc;
    }

    tuileClicked(posx, posy){
        //TODO
    }


}

class PresDem extends Pres{

    constructor() {
        super();
        this.ctx = undefined;
        this.grille = new Grille(true);
        this.premierClick = true;
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        if (message === MESSAGE.DEMINEUR){
            this.initPage();
        }

        else if (message === MESSAGE.DECOUVRE){
            this.grille.decouvreTuile(pieceJointe);
        }

        else if (message === MESSAGE.VICTOIRE){
            this.victoire();
        }
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
            this.setPremierClick();
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
            this.setPremierClick();
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
            this.setPremierClick();
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
     * @param coordX coordonnée x du placement du click souris
     * @param coordY coordonnée y du placement du click souris
     */
    click(coordX, coordY){
        let coord = [];
        coord[0] = coordX;
        coord[1] = coordY;
        if (this.premierClick){
            this.ctrl.getMessageFromPresentation(MESSAGE.PREMIERCLICK, coord);
            this.premierClick = false;
        }
        else {
            this.ctrl.getMessageFromPresentation(MESSAGE.CLICK, coord);
        }
    }

    setPremierClick(){
        this.premierClick = true;
    }

    /**
     * genere banner victoire
     */
    victoire(){
        //TODO
        // à ameilorer
        this.ctx.fillStyle = "#FFF"
        this.ctx.fillRect(0, 100, 300, 50);

        this.ctx.fillStyle = "#000"
        this.ctx.font = "20px 'San Francisco'";
        this.ctx.fillText("Vous avez gagné", 10, 130);
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
            this.pres.getMessage(message);
        }
    }

    getMessageFromAbstraction(message, piecejointe){
        //march pour decouvre
        this.pres.getMessage(message, piecejointe);
    }

    getMessageFromPresentation(message, piecejointe){
        //cela marche pour message : niveau, premierclick et click
        this.abs.getMessage(message, piecejointe);
    }
}