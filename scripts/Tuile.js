let image = new Image();
image.onload = function (){
    console.log("image loaded");
}
image.src = 'assets/tile.png';

class Tuile{
    constructor(x, y) {
        this.size = 30;
        this.x = x * this.size;
        this.y = y * this.size;
        this.caché = true;
        this.mine = false;
        this.decouvert = false;
    }

    draw(ctx){
        if (this.caché) {
            ctx.drawImage(image, this.x, this.y, this.size, this.size);
        }
    }
}