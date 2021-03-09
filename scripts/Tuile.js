let hidden = new Image();
hidden.onload = function (){
    console.log("cache loaded");
}
hidden.src = 'assets/tile.png';

let decouvert = new Image();
decouvert.onload = function (){
    console.log("decouvert loaded");
}
decouvert.src = 'assets/decouvert.png';

let mine = new Image();
mine.onload = function (){
    console.log("mine loaded");
}
mine.src = 'assets/mine.png';

let drapeau = new Image();
drapeau.onload = function (){
    console.log("drapeau loaded");
}
drapeau.src = 'assets/drapeau.png';

let couleurs = [];
couleurs[0] = "#0000ff";
couleurs[1] = "#008000"
couleurs[2] = "#ff0000"
couleurs[3] = "#00008B"
couleurs[4] = "#800000"
couleurs[5] = "#00ffff"
couleurs[6] = "#000000"
couleurs[7] = "#808080"


class Tuile{
    constructor(x, y) {
        this.size = 30;
        this.x = x * this.size;
        this.y = y * this.size;
        this.hidden = true;
        this.mine = false;
        this.drapeau = false;
    }

    draw(ctx, indice){
        if (this.hidden) {
            ctx.drawImage(hidden, this.x, this.y, this.size, this.size);
        }
        else {
            ctx.drawImage(decouvert, this.x, this.y, this.size, this.size);
        }

        if (this.mine){
            this.drawMine(ctx)
        }

        if (indice){
            this.drawIndice(ctx, indice);
        }

        if (this.drapeau){
            ctx.drawImage(drapeau, this.x, this.y, this.size, this.size);
        }

    }

    drawMine(ctx){
        ctx.drawImage(mine, this.x, this.y, this.size, this.size);
    }

    drawIndice(ctx, indice){
        ctx.fillStyle = couleurs[indice - 1];
        ctx.font = " 20px 'San Francisco'";
        ctx.fillText(indice, this.x + 11, this.y + 21);
    }

    setCache(){
        this.hidden = false;
    }

    setMine(){
        this.mine = true;
    }

    isDrapeau(){
        return this.drapeau;
    }

    setDrapeau(bool){
        this.drapeau = bool;
    }
}