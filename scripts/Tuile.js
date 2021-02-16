let hidden = new Image();
hidden.onload = function (){
    console.log("cache loaded");
}
hidden.src = 'assets/tile.png';

let decouvert = new Image();
decouvert.onload = function (){
    console.log("decouvert loaded");
}
decouvert.src = 'assets/decouvert.png'

class Tuile{
    constructor(x, y) {
        this.size = 30;
        this.x = x * this.size;
        this.y = y * this.size;
        this.hidden = true;
        this.mine = false;
        this.decouvert = false;
    }

    draw(ctx){
        if (this.hidden) {
            ctx.drawImage(hidden, this.x, this.y, this.size, this.size);
        }
        else {
            ctx.drawImage(decouvert, this.x, this.y, this.size, this.size);
        }
    }

    setCache(){
        this.hidden = false;
    }
}