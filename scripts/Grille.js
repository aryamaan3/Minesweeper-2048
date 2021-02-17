class Grille{
    constructor(demineur) {
        this.demineur = demineur;
        this.tabTuile = [];
        this.ctx = undefined;
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
        div.classList.add('containerDem');
        document.body.appendChild(div);

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        this.ctx = ctx;
        presDem.setCtx(ctx);
        canvas.classList.add("canvas");
        canvas.id = "grilles";

        canvas.addEventListener("click",  (e) => {
            // https://www.quirksmode.org/js/events_properties.html
            let posx, posy;
            if (e.offsetX) {
                posx = e.offsetX;
                posy = e.offsetY;
            }
            presDem.click(posx, posy);
        });

        let longeur, largeur;

        //desinne grille en fonction du niveau selectionné
        switch(niveau) {
            case(1):

                canvas.width = 9 * 30;
                canvas.height = 9 * 30;

                longeur = 9;
                largeur = 9;

                break;

            case(2):
                canvas.width = 16 * 30;
                canvas.height = 16 * 30;

                longeur = 16;
                largeur = 16;

                break;

            case(3):
                canvas.width = 30 * 30;
                canvas.height = 16 * 30;

                longeur = 30;
                largeur = 16;

                break;
        }
        div.appendChild(canvas);

        for (let i = longeur - 1; i >= 0; i -= 1) {
            this.tabTuile[i] = [];
            for (let j = largeur - 1; j >= 0; j -= 1) {
                let tuile = new Tuile(i, j);
                this.tabTuile[i][j] = tuile;
                tuile.draw(ctx);
            }
        }

        presDem.setCanvas(canvas);
    }

    /**
     * appel tuile pour decouvrir tuile
     * @param pos : index de la tuile dans tab
     */
    decouvreTuile(pos){
        let tuile = this.tabTuile[pos[0]][pos[1]];
        tuile.setCache();
        tuile.draw(this.ctx);
    }

    mine(pos){
        let tuile = this.tabTuile[pos[0]][pos[1]];
        tuile.setMine();
        tuile.drawMine(this.ctx);
    }

    showIndice(posEtIndice){
        let tuile = this.tabTuile[posEtIndice[0][0]][posEtIndice[0][1]];
        tuile.drawIndice(this.ctx, posEtIndice[1]);
    }
}