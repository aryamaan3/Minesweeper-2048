class Grille2048{
    constructor() {
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

        // Pour avoir une animation d'apparition
        tuile.setApparition(true);

        // On ajoute cette tuile à notre liste
        this.listeTuile.push(tuile);
    }

    miseAJourGrille(){
        // On efface tous les anciens div
        let anciennesTuiles = document.querySelectorAll('div[class^="tuile"]');
        // => pour le 'div[class^="tuile"]' :
        // https://stackoverflow.com/questions/22442808/can-you-use-a-wildcard-in-getelementbyid
        // Me permet de récupérer les className au format tuile[...]
        anciennesTuiles.forEach((element) => {
            element.parentElement.removeChild(element);
        })

        // On itère sur la liste pour recreer les div
            this.listeTuile.forEach(tuile => {
                    //console.log("Tuile : ligne " + tuile.ligne+", colonne "+tuile.colonne);

                    // On crée un nouveau div qui contiendra notre objet tuile
                    let div = document.createElement("div");
                    div.className = "tuile" + tuile.getValue(); // tuile2, tuile4, ...
                    div.innerHTML=""+tuile.getValue();

                    // Si c'est la première fois que la tuile apparait sur la grille
                    // on lui fait subir une animation
                    if(tuile.getApparition()){
                        div.style.animationName = "apparition";
                        div.style.animationDuration = "0.3s";

                        // Dès lors qu'elle a été exécutée une première fois, on en a plus besoin
                        tuile.setApparition(false);
                    }

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

        // Si la grille n'est pas full
        if(this.listeTuile.length < 16){
            // Création d'une nouvelle tuile
            this.placerNouvelleTuileSurGrille();
        }

        // mise à jour de la grille
        this.miseAJourGrille();

        console.log(this.listeTuile);

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

                if(tuilesSurMemeLigne.length > 1){
                    // Maintenant qu'on a toute les tuiles, on ordonne notre tableau en fonction de
                    // la colonne de l'element
                    tuilesSurMemeLigne.sort(this.ordonneLigne);

                    // Ici, il faut vérifier si deux cases adjacente sont de même
                    // valeur et si c'est le cas : les fusionner

                    if(this.fusionPossible(tuilesSurMemeLigne)){

                        this.fusion(tuilesSurMemeLigne, direction);
                        //this.miseAJourGrille();
                    }

                    //TODO re-sort ?
                    //TODO Modifier tuilesSurMemeLigne avec fusion

                    // Puis après l'avoir ordonné, il faut placer les tuiles au bon endroit :
                    // Si la longeur de tuileSurMemeLigne == 3 alors la première tuile
                    // est à la position 1, la deuxième à la pos 2 et la dernière à la pos 3

                    // Il faut stocker la longueur puisqu'elle va changer lorsqu'on va faire pop ou shift
                    let longueur = tuilesSurMemeLigne.length;

                    // Ce for permet d'éviter le switch à rallonge qui est en dessus que je garde
                    // tout de même au cas où j'ai besoin de plus de précision
                    if(direction === MESSAGE.RIGHT){
                        for(let len = 3; len > 3 - longueur; len --){
                            tuilesSurMemeLigne.pop().setColonne(len);

                        }
                    } else {
                        for(let len = 0; len < longueur; len ++){
                            // Shift et pas pop puisque le premier element de la liste doit se retrouver
                            // tout à gauche
                            tuilesSurMemeLigne.shift().setColonne(len);
                        }
                    }

                    /*
                    switch(tuilesSurMemeLigne.length){
                        case 2:
                            // On a deux tuiles sur la même ligne
                            tuilesSurMemeLigne.pop().setColonne(3);
                            tuilesSurMemeLigne.pop().setColonne(2);
                            break;
                        case 3:
                            // 3 tuiles sur la même ligne
                            tuilesSurMemeLigne.pop().setColonne(3);
                            tuilesSurMemeLigne.pop().setColonne(2);
                            tuilesSurMemeLigne.pop().setColonne(1);
                            break;
                        case 4:
                            // Pas de changement
                            break;
                    }*/
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

                if(tuileSurMemeColonne.length > 1){
                    // Maintenant qu'on a toute les tuiles, on ordonne notre tableau en fonction de
                    // la colonne de l'element
                    tuileSurMemeColonne.sort(this.ordonneColonne);


                    // Ici, il faut vérifier si deux cases adjacente sont de même
                    // valeur et si c'est le cas : les fusionner

                    if(this.fusionPossible(tuileSurMemeColonne)){
                        this.fusion(tuileSurMemeColonne, direction);
                    }

                    //TODO re-sort ?

                    // Il faut stocker la longueur puisqu'elle va changer lorsqu'on va faire pop ou shift
                    let longueur = tuileSurMemeColonne.length;

                    if(direction === MESSAGE.DOWN){
                        for(let len = 3; len > 3 - longueur; len --){
                            tuileSurMemeColonne.pop().setLigne(len);
                        }
                    } else { // UP
                        for(let len = 0; len < longueur; len ++){
                            // Shift et pas pop puisque le premier element de la liste doit se retrouver
                            // tout à gauche
                            tuileSurMemeColonne.shift().setLigne(len);
                        }
                    }
                    /*switch(tuileSurMemeColonne.length){
                        case 2:
                            // On a deux tuiles sur la même ligne
                            tuileSurMemeColonne.pop().setLigne(3);
                            tuileSurMemeColonne.pop().setLigne(2);
                            break;
                        case 3:
                            // 3 tuiles sur la même ligne
                            tuileSurMemeColonne.pop().setLigne(3);
                            tuileSurMemeColonne.pop().setLigne(2);
                            tuileSurMemeColonne.pop().setLigne(1);
                            break;
                        case 4:
                            // Pas de changement
                            break;
                    }*/

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

        // On sait que la tuile passée en paramètre fait déjà partie de notre liste
        tuileSurMemeLigne.push(tuile);

            // On parcours de nouveau nos tuiles pour trouver des alignements
        this.listeTuile.forEach( autreTuile =>{

            // Si on trouve une tuile (différente de la notre) sur la même ligne
            if( (tuile.ligne === autreTuile.ligne) && (tuile !== autreTuile) ){
                // On ajoute dans un tableau toutes les tuiles qui sont sur
                // la même ligne, une fois qu'on les a toute trouvées, on pourra
                // les déplacer
                tuileSurMemeLigne.push(autreTuile);
            }
        });

        return tuileSurMemeLigne;
    }

    trouveAlignementVertical(tuile){
        let tuileSurMemeColonne = [];

        tuileSurMemeColonne.push(tuile);
        // On parcours de nouveau nos tuiles pour trouver des alignements
        this.listeTuile.forEach( autreTuile =>{

            // Si on trouve une tuile (différente de la notre) sur la même ligne
            if( (tuile.colonne === autreTuile.colonne) && (tuile !== autreTuile) ){
                //console.log("Deux tuiles sur la même colonne");

                // On ajoute dans un tableau toutes les tuiles qui sont sur
                // la même ligne, une fois qu'on les a toute trouvées, on pourra
                // les déplacer
                tuileSurMemeColonne.push(autreTuile);
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

    /**
     * Fonction qui permet de savoir si une fusion est possible sur une ligne/colonne
     * @param tuileSurMemeLigneOuColonne : array ordonné des cases d'une ligne
     * @return true si une fusion est possible, false sinon
     */
    fusionPossible(tuileSurMemeLigneOuColonne){
        // On va itérer sur la liste et on va comparer la valeur de la tuile
        // actuelle avec la prochaine
        for(let i = 0; i < tuileSurMemeLigneOuColonne.length - 1; i ++){
            if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i+1].getValue()){
                //console.log("fusion possible");
                return true;
            }
        }
        return false;
    }

    fusion(tuileSurMemeLigneOuColonne, direction){
        //console.log(direction);
        // Le comportement au niveau de l'array est le même pour la DROITE et le BAS
        // De même pour la GAUCHE et le HAUT

        // On enregistre ça puisque ça va changer avec les pop et shift
        let len = tuileSurMemeLigneOuColonne.length;

        switch (direction){
            case MESSAGE.RIGHT:
            case MESSAGE.DOWN:
                // on va partir de la fin pour revenir vers le début
                // i = (len-1) car on veut prendre le dernier indice
                for(let i = (len-1); i > 0 ; i--){
                    if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i-1].getValue()){
                        /*console.log("On fusionne tuile ligne"
                            + tuileSurMemeLigneOuColonne[i].ligne + ", colonne : "
                            + tuileSurMemeLigneOuColonne[i].colonne + " et tuile ligne "+
                            + tuileSurMemeLigneOuColonne[i-1].ligne + ", colonne : "
                            + tuileSurMemeLigneOuColonne[i-1].colonne);*/
                        // On passe en premier la tuile qui va survivre à la fusion
                        this.fusionne2Tuiles(tuileSurMemeLigneOuColonne[i], tuileSurMemeLigneOuColonne[i-1]);

                    }
                }
                break;
            case MESSAGE.LEFT:
            case MESSAGE.UP:
                for(let i = 0; i < len - 1 ; i++){
                    if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i+1].getValue()){
                        // On passe en premier la tuile qui va survivre à la fusion
                        this.fusionne2Tuiles(tuileSurMemeLigneOuColonne[i], tuileSurMemeLigneOuColonne[i+1]);
                    }
                }
                break;
        }
    }

    /**
     * Fonction appelée par fusion()
     * @param tuile1 Tuile qui sera gardée, dans le cas d'un mouvement à droite, c'est la tuile la plus à droite
     * @param tuile2 Tuile qui sera supprimée au profit de tuile1
     */
    fusionne2Tuiles(tuile1,tuile2){
        // Soit l'on donne la valeur de tuile2 à tuile1
        // Ou alors on fait valeur de tuile1 * 2 puisque seule les tuiles de même valeur fusionne
        // Pour mettre en lumière des erreurs potentielles, j'applique la première méthode
        if(tuile1.getValue() !== tuile2.getValue() ){
            console.log("Erreur, les deux tuiles ne sont pas égales");
        }
        tuile1.setValue(tuile1.getValue() + tuile2.getValue());

        // On supprime tuile2 et son div .tuile associé

        // Cette ligne permet de ne pas fusionner une case qui vient de l'etre
        // J'avais un problème lorsque 3 case était sur la même ligne au moment d'une fusion
        tuile2.setValue(0);
        /*delete tuile2.ligne;
        delete tuile2.colonne;
        delete tuile2.value;*/
        this.remove(this.listeTuile, tuile2);
    }

    /**
     * Enlève un element d'un array
     * @param array
     * @param element
     */
    remove(array, element){
        let index = array.indexOf(element);
        array.splice(index,1);
    }

}