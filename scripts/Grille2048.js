class Grille2048{
    constructor() {
        console.log("nouvelle grille");
        this.nbLignes = 4;
        this.nbColonnes = 4;
        //this.nbCases = this.nbLignes * this.nbColonnes;
        this.grille = document.createElement("div");
        this.grille.id = "grille2048";

        // Cette matrice contiendra les tuiles
        //this.matrice = [];
        // Liste non-ordonnée qui contient toute les tuiles présentes dans le jeu
        this.listeTuile = [];
    }

    construction(){
        // On crée et accroche notre element HTML à la page
        let container = document.createElement('div');
        container.id = "container";
        document.body.appendChild(container);
        // On la remplie
        this.fillGrilleDiv();

        // On l'ajoute au html
        container.appendChild(this.grille);

        this.placerNouvelleTuileSurGrille();
        this.placerNouvelleTuileSurGrille();
        this.miseAJourGrille();
    }

    /**
     * Remplie la matrice de div (4 par lignes)
     */
    fillGrilleDiv(){
        for(let l = 0; l <this.nbLignes; l++){

            let ligne = document.createElement("div");
            ligne.id = "ligne"+l + "";
            ligne.className = "ligne";
            //console.log("On append une ligne à grille");
            for(let c = 0; c <this.nbColonnes; c++){

                let div = document.createElement("div");
                div.id = "case"+ l +"-"+ c;
                div.className = "case";
                ligne.appendChild(div);

            }
            this.grille.appendChild(ligne);
        }
    }

    /**
     * Fonction qui sera appelée deux fois par tour et qui place aléatoirement deux
     * nouvelle tuile (de valeur 2 ou 4) sur la grille
     */
    placerNouvelleTuileSurGrille(){
        let ligne;
        let colonne;

        // On vérifie que la case selectionnée au hasard est bien vide
        do {
            // format de l'id d'une case : case{ligne}-{colonne}
            ligne = Math.round(Math.random() * 3);
            colonne = Math.round(Math.random() * 3);
        }while(this.verifieEmplacement(ligne, colonne))

        let tuile = new Tuile2048();
        tuile.setLigne(ligne);
        tuile.setColonne(colonne);
        tuile.setValue(2);

        // On ajoute cette tuile à notre liste
        this.listeTuile.push(tuile);
    }

    miseAJourGrille(){
        // On efface tous les anciens div
        let anciennesTuiles = document.querySelectorAll(".tuile");
        anciennesTuiles.forEach((element, index, parent) => {
            element.parentElement.removeChild(element);
        })

        // On itère sur la liste pour recreer les div
            this.listeTuile.forEach(tuile => {
                    //console.log("Tuile : ligne " + tuile.ligne+", colonne "+tuile.colonne);

                    // On crée un nouveau div qui contiendra notre objet tuile
                    let div = document.createElement("div");
                    div.className = "tuile";
                    div.innerHTML="2";

                    //console.log("On va récuperer la case"+ligne+"-"+colonne);
                    //on récupère notre case grâce à l'id généré aléatoirement
                    let Case = document.getElementById("case"+ tuile.ligne +"-"+tuile.colonne);

                    //console.log(Case);
                    //console.log(this.matrice);
                    Case.appendChild(div);
        });
    }

    nouveauTour(direction){
        console.log("Nouveau tour");
        // Déplacement de toutes les tuiles dans la matrice
        this.deplaceTuileDansMatrice(direction);

        // mise à jour de la grille
        this.miseAJourGrille();
        // Création des nouvelles tuiles

    }

    deplaceTuileDansMatrice(direction) {

        this.listeTuile.forEach(tuile => {

                    switch (direction){
                        case MESSAGE.RIGHT:
                            // On les bouge dans l'array
                            this.changeHorizontalPos(tuile, 3);
                            // on change les propriétés de l'objet
                            console.log(this.listeTuile);
                            break;
                    }
                });
    }

    changeHorizontalPos(tuile, newPos){
        console.log("Changement horizontal");
        let oldPos = tuile.colonne;
        tuile.setColonne(newPos);
    }

    verifieEmplacement(ligne, colonne) {
        this.listeTuile.forEach(tuile => {
            if(tuile.ligne == ligne && tuile.colonne == colonne){
                return false;
            }
        })
    }
}