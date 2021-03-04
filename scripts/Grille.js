class Grille{
    constructor(demineur) {
        this.demineur = demineur;
        this.tabTuile = [];
        this.ctx = undefined;
    }

    /**
     * construit grille en fonction du boolean
     * @param niveau selectionné
     * @param presDem afin d'acceder à certaines methodes de pres étant donnée que grille est une
     * extension de presDem
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
        //on crée le div

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        this.ctx = ctx;
        presDem.setCtx(ctx);
        canvas.classList.add("canvas"); //attribue classe par defaut
        canvas.id = "grilles";
        //on crée le canvas

        //on change la classe css en fonction du niveau
        if(niveau !== 1){
            canvas.classList.remove("canvas");
            canvas.classList.add("canvas2");
        }

        canvas.addEventListener("click",  (e) => {
            // https://www.quirksmode.org/js/events_properties.html
            let posx, posy;
            if (e.offsetX) { //position sur le canvas
                posx = e.offsetX;
                posy = e.offsetY;
            }
            presDem.click(posx, posy, true); //click gauche
        });

        canvas.addEventListener("contextmenu", (e) => {
            //https://stackoverflow.com/questions/47737404/detecting-left-and-right-mouse-events-for-a-canvas-game
            let posx, posy;
            e.preventDefault();
            if (e.offsetX) { //position sur le canvas
                posx = e.offsetX;
                posy = e.offsetY;
            }
            presDem.click(posx, posy, false) //click droit
        })

        let longeur, largeur;

        //dimensionne canvas en fonction du niveau selectionné
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
        //ajoute canvas à l'html

        //dessine les tuiles cachés
        for (let ligne = 0; ligne < longeur; ligne ++) { // on itére sur les lignes
            this.tabTuile[ligne] = []; //on cree le deuxieme dimension
            for (let col = 0; col < largeur; col ++) { //on itere sur les colonnes
                let tuile = new Tuile(ligne, col);
                this.tabTuile[ligne][col] = tuile;
                tuile.draw(ctx); //dessine l'image
            }
        }

        presDem.setCanvas(canvas); //on envoi le canvas au pres
    }

    /**
     * appel tuile.js pour decouvrir la tuile cliqué
     * @param pos : index de la tuile dans tab
     */
    decouvreTuile(pos){
        let tuile = this.tabTuile[pos[0]][pos[1]];
        tuile.setCache();
        tuile.draw(this.ctx);
    }

    /**
     * appel tuile.js pour afficher une mine à la place de la tuile
     * @param pos de la tuile dans le tab
     */
    mine(pos){
        let tuile = this.tabTuile[pos[0]][pos[1]];
        tuile.setMine();
        tuile.draw(this.ctx);
    }

    /**
     * appel tuile.js pour dessiner le nb de mines adjacents à la tuile
     * @param posEtIndice de la tuile
     */
    showIndice(posEtIndice){
        let tuile = this.tabTuile[posEtIndice[0][0]][posEtIndice[0][1]];
        tuile.draw(this.ctx, posEtIndice[1]);
    }

    /**
     * appel tuile pour dessiner un drapeau à l'endroit cliqué
     * @param pos de la tuile
     * @param presDem la pres de demineur
     */
    drapeau(pos, presDem){

        let tuile = this.tabTuile[pos[0]][pos[1]];
        if (!tuile.isDrapeau()) { //si la tuile n'a pas de drapeau
            tuile.setDrapeau(true)
        }
        else { //si la tuile a deja un drapeau
            tuile.setDrapeau(false);
            presDem.getMessage(MESSAGE.REM_DRAPEAU);
        }
        tuile.draw(this.ctx);
    }
}