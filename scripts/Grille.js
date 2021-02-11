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
        div.classList.add('container');
        document.body.appendChild(div);

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        presDem.setCtx(ctx);
        canvas.classList.add("canvas");
        canvas.id = "grilles";

        let premierClick = true;
        canvas.addEventListener("click",  () => {
            if(premierClick){
                presDem.click(MESSAGE.PREMIERCLICK); //gere le premier click
                premierClick = false;
            }
            presDem.click(MESSAGE.CLICK);
        });

        //desinne grille en fonction du niveau selectionné
        switch(niveau) {
            case(1):

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
                canvas.width = 16 * 30;
                canvas.height = 16 * 30;
                div.appendChild(canvas);

                let longeur = 16;
                let largeur = 16;


                for (let i = longeur - 1; i >= 0; i -= 1) {
                    for (let j = largeur - 1; j >= 0; j -= 1) {
                        let tuile = new Tuile(i, j);
                        tuile.draw(ctx);
                    }
                }
                break;

            case(3):
                canvas.width = 30 * 30;
                canvas.height = 16 * 30;
                div.appendChild(canvas);

                let len = 30;
                let wid = 16;

                for (let i = len - 1; i >= 0; i -= 1) {
                    for (let j = wid - 1; j >= 0; j -= 1) {
                        let tuile = new Tuile(i, j);
                        tuile.draw(ctx);
                    }
                }
                break;
        }
    }
}