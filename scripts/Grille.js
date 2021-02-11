class Grille{
    constructor(demineur) {
        this.demineur = demineur;
    }

    /**
     * construit grille en fonction du boolean
     * @param niveau
     * @param presDem
     */
    drawGrille(niveau, presDem){
        /*
        let container = document.createElement('div');
        container.id = "container";
        document.body.appendChild(container);*/

        let div = document.createElement('div');
        div.id = "container";

        if (this.demineur){
            this.drawGrilleDem(niveau, div, presDem);
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
     * @param presDem pres de Demineur
     */
    drawGrilleDem(niveau, div, presDem){
        switch(niveau) {
            case(1):

                div.classList.add('container');
                document.body.appendChild(div);

                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                presDem.setCtx(ctx);
                canvas.classList.add("canvas");
                canvas.id = "grilles";
                canvas.width = 9 * 30;
                canvas.height = 9 * 30;
                div.appendChild(canvas);

                let long = 9;
                let larg = 9;

                for (let i = long - 1; i >= 0; i -= 1) {
                    for (let j = larg - 1; j >= 0; j -= 1) {
                        let tuile = new Tuile(i, j);
                        tuile.draw(ctx);
                    }
                }
                break;

            case(2):
                div.classList.add('container');
                document.body.appendChild(div);

                let cvs = document.createElement('canvas');
                let context = cvs.getContext("2d");
                presDem.setCtx(context);
                cvs.classList.add("canvas2");
                cvs.id = "grilles";
                cvs.width = 16 * 30;
                cvs.height = 16 * 30;
                div.appendChild(cvs);

                let longeur = 16;
                let largeur = 16;


                for (let i = longeur - 1; i >= 0; i -= 1) {
                    for (let j = largeur - 1; j >= 0; j -= 1) {
                        let tuile = new Tuile(i, j);
                        tuile.draw(context);
                    }
                }
                break;

            case(3):

                div.classList.add('container');
                document.body.appendChild(div);

                let can = document.createElement('canvas');
                let contx = can.getContext("2d");
                presDem.setCtx(contx);
                can.classList.add("canvas2");
                can.id = "grilles";
                can.width = 30 * 30;
                can.height = 16 * 30;
                div.appendChild(can);

                let len = 30;
                let wid = 16;

                for (let i = len - 1; i >= 0; i -= 1) {
                    for (let j = wid - 1; j >= 0; j -= 1) {
                        let tuile = new Tuile(i, j);
                        tuile.draw(contx);
                    }
                }
                break;

        }
    }

}