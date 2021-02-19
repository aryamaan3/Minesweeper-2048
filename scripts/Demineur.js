class AbsDem extends Abs{
    constructor() {
        super();
        this.tabTuiles = [];
        this.colonne = 9; //colonne
        this.ligne = 9; //ligne
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
                this.colonne = 16;
                this.ligne = 16;
                this.genTab();
                break;

            case(3):
                this.colonne = 16;
                this.ligne = 30;
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
            if (this.ligne === 9){
                this.genMines(9, pieceJointe);
            }
            else if (this.ligne === 16){
                this.genMines(40, pieceJointe);
            }
            else{
                this.genMines(99, pieceJointe);
            }
        }

        else if (message === MESSAGE.CLICK){
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
        for (let i = 0; i < this.ligne; i++){ //ligne
            this.tabTuiles[i] = []; //crée le deuxieme dim du tab
            for (let j = 0; j < this.colonne; j++){ //colonne
                this.tabTuiles[i][j] = new TuileAbs(i, j);
            }
        }
    }

    getNiveau(){
        switch(this.ligne){
            case(9):
                return 1;
            case(16):
                return 2;
            default:
                return 3;
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

        x = Math.floor(Math.random() *this.ligne);
        y = Math.floor(Math.random() *this.colonne);

        for (i = 0; i < mines; i++){
            //traite les cas où la tuile est déjà une mine et si ça correspond à la tuile cliqué
            while ((this.tabTuiles[x][y].isMine()) || (x === coordX && y === coordY)){
                x = Math.floor(Math.random() *this.ligne);
                y = Math.floor(Math.random() *this.colonne);
            }
            this.tabTuiles[x][y].setMine();
        }
        //verifie si il y a bien le bon nb de mines genérés
        if (this.countMine() !== mines){
            console.log("erreur sur nb de mines genérés");
        }

        this.genIndiceTab(); //ajoute les indices aux tuiles
        this.tuileClicked(coordX, coordY); //traite la tuile cliqué
    }

    /**
     * compte le nb de mines dans le tab
     * @return acc = mines dans le tab
     */
    countMine(){
        let acc = 0;
        for (let i = 0; i < this.ligne; i++){
            for (let j = 0; j < this.colonne; j++){
                if (this.tabTuiles[i][j].isMine()){
                    acc ++;
                }
            }
        }
        return acc;
    }

    /**
     * appel genIndiceTuile pour chaque tuile du tab
     */
    genIndiceTab(){
        for (let ligne = 0; ligne < this.ligne; ligne ++){
            for (let colonne = 0; colonne < this.colonne; colonne ++){
                this.genIndiceTuile(ligne, colonne);
            }
        }
    }

    /**
     * genere indice en fonction des mines autour d'une tuile
     * marque les indices dans les prop de la tuile
     * @param ligne indices ligne dans le tab de la tuile
     * @param colonne indice col dans le tab de la tuile
     */
    genIndiceTuile(ligne, colonne){
        //https://gamedev.stackexchange.com/questions/31909/best-algorithm-for-recursive-adjacent-tiles
        let nbMines = 0;
        //on itére 3 x 3 pour les tuiles adjacente - 1 tuile concerné = 8 fois
        for (let i = -1; i <= 1; i++){ // on fait iterer -1, 0 et 1
            for (let j = -1; j <= 1; j++){
                //verifie si c'est pas en dehors du tab
                if ((ligne + i >= 0) && (ligne + i < this.ligne) && (colonne + j >= 0) && (colonne + j < this.colonne)) {
                    let tuile = this.tabTuiles[ligne + i][colonne + j];
                    if (tuile.isMine()) {
                        nbMines++;
                    }
                }
            }
        }
        this.tabTuiles[ligne][colonne].setIndice(nbMines);
    }

    /**
     * decide ce qu'il faut faire lors d'un click d'une tuile
     * @param posx indice ligne de la tuile dans tab
     * @param posy inidce colonne de la tuile dans tab
     */
    tuileClicked(posx, posy){
        let tuile = this.tabTuiles[posx][posy];
        let pos = [];
        pos[0] = posx;
        pos[1] = posy;
        if (tuile.isHidden()){
            if (tuile.isMine()){
                this.ctrl.getMessageFromAbstraction(MESSAGE.MINE, pos);
                this.ctrl.getMessageFromAbstraction(MESSAGE.DEF_DEM, this.getNiveau());
            }
            else {
                this.ctrl.getMessageFromAbstraction(MESSAGE.DECOUVRE, pos);
                tuile.setDecouvert(); //marque tuile comme decouvert
                let posEtIndice = [];
                posEtIndice[0] = pos;
                posEtIndice [1] = tuile.getIndice();
                this.ctrl.getMessageFromAbstraction(MESSAGE.INDICE, posEtIndice); //montre le nb des mines adjacents
                if (!posEtIndice[1]){ //si indice 0
                    this.decouvrirAutour(tuile, pos); //decouvre les tuile à 0 autour
                }
                this.verifVictoire() //verifie si le joueur a gagné
            }
        }
    }

    /**
     * decouvre les tuiles ayant indice 0 autour de la tuile donnée en param
     * @param tuile ayant comme indice 0
     * @param pos
     */
    decouvrirAutour(tuile, pos){
        //meme algo que pour les indices
        for (let i = -1; i <= 1; i++){ // on fait iterer -1, 0 et 1
            for (let j = -1; j <= 1; j++){
                //verifie si c'est pas en dehors du tab
                if ((pos[0] + i >= 0) && (pos[0] + i < this.ligne) && (pos[1] + j >= 0) && (pos[1] + j < this.colonne)) {
                    let tuile2 = this.tabTuiles[pos[0] + i][pos[1] + j];
                    if (tuile2.getIndice()) { //si la tuile à une indice sup à 0
                        this.tuileClicked(pos[0] + i, pos[1] + j);
                    }
                    else {
                        if (tuile2.isHidden()) { //indice 0 et non traité
                            this.tuileClicked(pos[0] + i, pos[1] + j); //recursion
                            //afin de traiter les tuiles à 0 autour de celle là
                        }
                    }
                }
            }
        }
    }

    verifVictoire(){
        let nbHidden = 0;
        //on compte le nb de tuiles encore cachés dans le tab
        for (let ligne = 0; ligne < this.ligne; ligne++){
            for (let colonne = 0; colonne < this.colonne; colonne++){
                let tuile = this.tabTuiles[ligne][colonne];
                if (tuile.isHidden()){
                    nbHidden ++;
                }
            }
        }
        //on differencie par niveau
        switch(this.ligne){
            case(9):
                if (nbHidden === 9){
                    this.ctrl.getMessageFromAbstraction(MESSAGE.VIC_DEM, 1);
                }
                break;

            case(16):
                if (nbHidden === 40){
                    this.ctrl.getMessageFromAbstraction(MESSAGE.VIC_DEM, 2);
                }
                break;

            default:
                if (nbHidden === 99){
                    this.ctrl.getMessageFromAbstraction(MESSAGE.VIC_DEM, 3);
                }
                break;
        }
    }


}

class PresDem extends Pres{

    constructor() {
        super();
        this.ctx = undefined;
        this.grille = new Grille(true);
        this.premierClick = true;
        this.canvas = undefined;
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        if (message === MESSAGE.DEMINEUR){
            this.initPage();
        }

        else if (message === MESSAGE.DECOUVRE){
            this.grille.decouvreTuile(pieceJointe);
        }

        else if (message === MESSAGE.INDICE){
            this.grille.showIndice(pieceJointe);
        }

        else if (message === MESSAGE.MINE){
            this.grille.mine(pieceJointe);
        }

        else if (message === MESSAGE.VIC_DEM){
            this.afficher("Vous avez gagné!");
        }

        else if (message === MESSAGE.DEF_DEM){
            this.afficher("Vous avez perdu");
        }

        else {
            super.recoitMessage(message);
        }
    }

    setCtx(ctx){
        this.ctx = ctx;
    }

    setCanvas(canvas){
        this.canvas = canvas;
    }

    /**
     * genere la page et appel la methode pour choisir le niveau
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

        let h1 = document.createElement('h1');
        h1.innerHTML="choisissez votre niveau";
        h1.style.cssText = "text-align:center; margin: 0 auto;";
        div.appendChild(h1);

        div.appendChild(document.createElement('br')); // saut de ligne

        let niv1 = document.createElement('button');
        niv1.innerHTML = "débutant";
        niv1.id = "1";
        niv1.classList.add('niveau');
        niv1.onclick = () =>{
            //this.removeButtons(div, niv1, niv2, niv3, h1);
            document.body.removeChild(div) //enleve tous les boutons afin de laisser la place à la grille
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
            //this.removeButtons(div, niv1, niv2, niv3, h1);
            document.body.removeChild(div) //enleve tous les boutons afin de laisser la place à la grille
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
            //this.removeButtons(div, niv1, niv2, niv3, h1);
            document.body.removeChild(div) //enleve tous les boutons afin de laisser la place à la grille
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 3);
            this.grille.drawGrille(3, this);
            this.setPremierClick();
        };
        div.appendChild(niv3);

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
     * affiche le texte au milieu du canvas
     * @param texte à afficher
     */
    afficher(texte){
        this.ctx.fillStyle = "#FFF"
        this.ctx.fillRect(0, (this.canvas.height - 70) / 2, this.canvas.width, 50);

        this.ctx.fillStyle = "#000"
        this.ctx.font = "20px 'San Francisco'";
        this.ctx.fillText(texte, (this.canvas.width / 2) - 65, (this.canvas.height / 2) - 5);
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
        //march pour victoire, perte, decouvre, indice et mine
        this.pres.getMessage(message, piecejointe);
        if (message === MESSAGE.VIC_DEM || message === MESSAGE.DEF_DEM){
            this.parent.recoitMessageDUnEnfant(message, piecejointe, this);
        }
    }

    getMessageFromPresentation(message, piecejointe){
        //cela marche pour message : niveau, premierclick et click
        this.abs.getMessage(message, piecejointe);
    }
}