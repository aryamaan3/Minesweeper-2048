class Grille2048{
    constructor() {
        console.log("nouvelle grille");
        this.nbLignes = 4;
        this.nbColonnes = 4;
        //this.nbCases = this.nbLignes * this.nbColonnes;
        this.grille = document.createElement("div");
        this.grille.id = "grille2048";

        // Cette matrice contiendra les tuiles
        this.matrice = [];
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

        this.creationMatrice();

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

    creationMatrice(){
        for(let l = 0; l < this.nbLignes; l++){
            // Crée les 4 lignes
            this.matrice[l] = [null, null, null, null];
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
        // On ajoute cette tuile à notre matrice
        this.matrice[ligne][colonne] = tuile;
    }

    miseAJourGrille(){
        // On itère sur la matrice à la recherche de tuile
        this.matrice.forEach(e => {
            e.forEach(tuile => {
                if(tuile instanceof Tuile2048){
                    console.log("Tuile : ligne " + tuile.ligne+", colonne "+tuile.colonne);

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
                }
            })
        });
    }

    /**
     * Méthode pour vérifier qu'une case est bien disponible pour y disposer une tuilereturn true si c'est le cas
     * @param ligne
     * @param colonne
     * @returns {boolean} True si l'emplacement est valide
     */
    verifieEmplacement(ligne, colonne){
        if((this.matrice[ligne][colonne] instanceof Tuile2048)) {return true}
    }

    nouveauTour(direction){
        // Déplacement de toutes les tuiles dans la matrice

        // mise à jour de la grille

        // Création des nouvelles tuiles

    }
}