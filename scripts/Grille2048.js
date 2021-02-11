class Grille2048{
    constructor() {
        this.nbLignes = 4;
        this.nbColonnes = 4;
        this.nbCases = this.nbLignes * this.nbColonnes;
        this.grille = document.createElement("div");
        this.grille.id = "grille2048";
    }

    construction(){
        // On crée et accroche notre element HTML à la page
        let container = document.createElement('div');
        container.id = "container";
        document.body.appendChild(container);

        // On crée notre grille
        //this.createMatrix();
        // On la remplie
        this.fillGrille();

        container.appendChild(this.grille);
    }

    /**
     * Remplie la matrice de div (4 par lignes)
     */
    fillGrille(){
        for(let l = 0; l <this.nbLignes; l++){

            let ligne = document.createElement("div");
            ligne.id = l + "";
            console.log("On append une ligne à grille");
            for(let c = 0; c <this.nbColonnes; c++){

                let div = document.createElement("div");
                div.id = l +"-"+ c;
                ligne.appendChild(div);

            }
            this.grille.appendChild(ligne);
        }
    }
}