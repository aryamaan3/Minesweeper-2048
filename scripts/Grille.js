class Grille{
    constructor() {
    }

    /**
     * construit grille en fonction du boolean
     * @param niveau
     */
    drawGrille(niveau){
        /*
        let container = document.createElement('div');
        container.id = "container";
        document.body.appendChild(container);*/

        let div = document.createElement('div');
        div.id = "container";

        if (this.demineur){
            this.drawGrilleDem(niveau, div);
        }

        else {
            div.style.cssText = "position:absolute; top:300px; left:520px; text-align:center";
            document.body.appendChild(div);

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            canvas.style.cssText = "border: 2px solid; border-radius: 15px; border-color: rgb(182, 174, 162)"
            canvas.id = "grilles";
            canvas.width = 4 * 100;
            canvas.height = 4 * 100;
            div.appendChild(canvas);

            let long = 4;
            let larg = 4;
            let tl = 100
            let tuile = new Image();
            tuile.onload = function (){
                console.log("image loaded");
            }
            tuile.src = 'assets/tile2.png';

            for (let i = long - 1; i >= 0; i -= 1) {
                for (let j = larg - 1; j >= 0; j -= 1) {
                    ctx.drawImage(tuile, i * tl, j * tl, tl, tl);
                }
            }
        }

    }

    /**
     * dessine la grille du demineur en fonction du niveau
     * @param niveau
     * @param div
     */
    drawGrilleDem(niveau, div){
        switch(niveau) {
            case(1):

                div.style.cssText = "position:absolute; top:300px; left:600px; text-align:center";
                document.body.appendChild(div);

                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                canvas.style.cssText = "border-style: solid"
                canvas.id = "grilles";
                canvas.width = 9 * 30;
                canvas.height = 9 * 30;
                div.appendChild(canvas);

                let long = 9;
                let larg = 9;
                let tl = 30;
                let tuile = new Image();
                tuile.onload = function (){
                    console.log("image loaded");
                }
                tuile.src = 'assets/tile.jpg';

                for (let i = long - 1; i >= 0; i -= 1) {
                    for (let j = larg - 1; j >= 0; j -= 1) {
                        ctx.drawImage(tuile, i * tl, j * tl, tl, tl);
                    }
                }
                break;

            case(2):
                div.style.cssText = "position:absolute; top:300px; left:475px; text-align:center";
                document.body.appendChild(div);

                let cvs = document.createElement('canvas');
                let context = cvs.getContext("2d");
                cvs.style.cssText = "border-style: solid"
                cvs.id = "grilles";
                cvs.width = 16 * 30;
                cvs.height = 16 * 30;
                div.appendChild(cvs);

                let longeur = 16;
                let largeur = 16;
                let taille = 30
                let tile = new Image();
                tile.onload = function (){
                    console.log("image loaded");
                }
                tile.src = 'assets/tile.jpg';

                for (let i = longeur - 1; i >= 0; i -= 1) {
                    for (let j = largeur - 1; j >= 0; j -= 1) {
                        context.drawImage(tile, i * taille, j * taille, taille, taille);
                    }
                }
                break;

            case(3):

                div.style.cssText = "position:absolute; top:300px; left:270px; text-align:center";
                div.appendChild(div);

                let can = document.createElement('canvas');
                let contx = can.getContext("2d");
                can.style.cssText = "border-style: solid"
                can.id = "grilles";
                can.width = 30 * 30;
                can.height = 16 * 30;
                div.appendChild(can);

                let len = 30;
                let wid = 16;
                let size = 30;
                let image = new Image();
                image.onload = function (){
                    console.log("image loaded");
                }
                image.src = 'assets/tile.jpg';

                for (let i = len - 1; i >= 0; i -= 1) {
                    for (let j = wid - 1; j >= 0; j -= 1) {
                        contx.drawImage(image, i * size, j * size, size, size);
                    }
                }
                break;

        }
    }
}