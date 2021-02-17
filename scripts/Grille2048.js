class Grille2048{
    constructor() {
        console.log("nouvelle grille");
        this.nbLignes = 4;
        this.nbColonnes = 4;
        //this.nbCases = this.nbLignes * this.nbColonnes;
        this.grille = document.createElement("div");
        this.grille.id = "grille2048";

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

    verifieEmplacement(ligne, colonne) {
        let emplacement = false;
        this.listeTuile.forEach( tuile => {
            //console.log("test de ligne "+tuile.ligne+" et colonne "+tuile.colonne+ " pour y mettre "+ligne+" "+colonne);
            if(tuile.ligne === ligne && tuile.colonne === colonne){
                emplacement = true;
            }
        });
        return emplacement;
    }

    /**
     * Fonction qui sera appelée deux fois par tour et qui place aléatoirement deux
     * nouvelle tuile (de valeur 2 ou 4) sur la grille
     */
    placerNouvelleTuileSurGrille(){
        let ligne;
        let colonne;

        // On vérifie que la case selectionnée au hasard est bien vide
        do{
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
        anciennesTuiles.forEach((element) => {
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

        let tuilesSurMemeLigne = [];
        let tuileSurMemeColonne = [];

        if(direction === MESSAGE.RIGHT || direction === MESSAGE.LEFT){
            this.listeTuile.forEach( tuile => {
                // On veut récuperer les tuiles qui sont sur la même ligne que celle ci
                // Inconvéniant : sera executé pour chaque tuile
                tuilesSurMemeLigne = this.trouveAlignementHorinzontal(tuile);

                // Maintenant qu'on un array pour case sur la même ligne ou colonnes
                // On peut les déplacer

                if(tuilesSurMemeLigne.length !== 0){
                    // Maintenant qu'on a toute les tuiles, on ordonne notre tableau en fonction de
                    // la colonne de l'element
                    tuilesSurMemeLigne.sort(this.ordonneLigne);
                    console.log(tuilesSurMemeLigne);
                } else { // Si il n'y a pas d'autre tuile, il faut la déplacer au maximum
                    if(direction === MESSAGE.RIGHT){ tuile.setColonne(3); }
                    else{ tuile.setColonne(0); }
                }
                //this.changeHorizontalPos(tuile, 3);

            })
        } else if(direction === MESSAGE.UP || direction === MESSAGE.DOWN){
            this.listeTuile.forEach( tuile => {
                // On veut récuperer les tuiles qui sont sur la même colonne que celle ci
                tuileSurMemeColonne = this.trouveAlignementVertical(tuile);

                // Maintenant qu'on un array pour case sur la même ligne ou colonnes
                // On peut les déplacer

                if(tuileSurMemeColonne.length !== 0){
                    // Maintenant qu'on a toute les tuiles, on ordonne notre tableau en fonction de
                    // la colonne de l'element
                    tuileSurMemeColonne.sort(this.ordonneColonne);

                } else { // Si il n'y a pas d'autre tuile, il faut la déplacer au maximum
                    if(direction === MESSAGE.DOWN){ tuile.setLigne(3); }
                    else{ tuile.setLigne(0); }
                }
                //this.changeHorizontalPos(tuile, 3);

            })
            //tuileSurMemeColonne = this.trouveAlignementVertical();
        }
    }

    /**
     *
     * @returns {[]} Array qui contient toutes les tuiles
     */
    trouveAlignementHorinzontal(tuile){
        let tuileSurMemeLigne = [];
            // On parcours de nouveau nos tuiles pour trouver des alignements
            this.listeTuile.forEach( autreTuile =>{

                // Si on trouve une tuile (différente de la notre) sur la même ligne
                if( (tuile.ligne === autreTuile.ligne) && (tuile !== autreTuile) ){
                    console.log("Deux tuiles sur la même ligne");
                    // On ajoute dans un tableau toutes les tuiles qui sont sur
                    // la même ligne, une fois qu'on les a toute trouvées, on pourra
                    // les déplacer
                    tuileSurMemeLigne.push(tuile);
                }

        })

        return tuileSurMemeLigne;
    }

    trouveAlignementVertical(tuile){
        let tuileSurMemeColonne = [];
        // On parcours de nouveau nos tuiles pour trouver des alignements
        this.listeTuile.forEach( autreTuile =>{

            // Si on trouve une tuile (différente de la notre) sur la même ligne
            if( (tuile.colonne === autreTuile.colonne) && (tuile !== autreTuile) ){
                console.log("Deux tuiles sur la même colonne");
                // On ajoute dans un tableau toutes les tuiles qui sont sur
                // la même ligne, une fois qu'on les a toute trouvées, on pourra
                // les déplacer
                tuileSurMemeColonne.push(tuile);
            }

        })

        return tuileSurMemeColonne;
    }

    /**
     * Fonction utilisée par sort pour faire un trie automatique de
     * l'array qui contient les aligments horizontaux
     * @param a
     * @param b
     * @returns {number}
     */
    ordonneLigne(a,b){
        // a et b sont deux tuiles
        // Sort s'attends à recevoir 1 si a > b, -1 si a < b, 0 sinon
        if(a.colonne > b.colonne){ return 1;}
        else if (a.colonne < b.colonne){ return -1;}
        else {return 0;}
    }

    ordonneColonne(a,b){
        // a et b sont deux tuiles
        // Sort s'attends à recevoir 1 si a > b, -1 si a < b, 0 sinon
        if(a.ligne > b.ligne){ return 1;}
        else if (a.ligne < b.ligne){ return -1;}
        else {return 0;}
    }

    changeHorizontalPos(tuile, newPos){
        //let oldPos = tuile.colonne;
        tuile.setColonne(newPos);
    }

    changeVerticalPos(tuile, newPos){
        //let oldPos = tuile.colonne;
        tuile.setLigne(newPos);
    }

}