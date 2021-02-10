class Grille{
    constructor(longeur, largeur, taille) {
        this.longeur = longeur;
        this.largeur = largeur;
        this.taille = taille;
    }

    drawGrille(){
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        canvas.id = "grilles";
        canvas.width = this.largeur * this.taille;
        canvas.length = this.longeur * this.taille;
        let tile = new Image();
        tile.src = '../assets/tile.jpg';
        console.log(tile);
        //TODO
    }
}