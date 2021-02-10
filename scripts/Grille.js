class Grille{
    constructor(longeur, largeur, taille) {
        this.longeur = longeur;
        this.largeur = largeur;
        this.taille = taille;
    }

    drawGrille(){

        let div = document.createElement('div');
        div.id = "canvas";
        div.style.cssText = "position:absolute; top:300px; left:500px";

        document.body.appendChild(div);
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        canvas.id = "grilles";
        canvas.width = this.largeur * this.taille;
        canvas.height = this.longeur * this.taille;
        div.appendChild(canvas);
        let tile = new Image();
        tile.src = 'assets/tile.jpg';
        for (let i = this.longeur - 1; i >= 0; i -= 1) {
            for (let j = this.largeur - 1; j >= 0; j -= 1) {
                ctx.drawImage(tile, i * this.taille, j * this.taille, this.taille, this.taille);
            }
        }
    }
}