class Grille2048{
    constructor() {
        this.nbLignes = 4;
        this.nbColonnes = 4;
        //this.nbCases = this.nbLignes * this.nbColonnes;
        this.grille = document.createElement("div");
        this.grille.id = "grille2048";

        // Liste non-ordonnée qui contient toute les tuiles présentes dans le jeu
        this.listeTuile = [];

        // Variable qui sera incrémentée dans cette classe et récupérée à chaque
        // tour par 2048 pour pouvoir le display
        this.score = 0;

        // Permet de generer une victoire si cette valeur est >= 2048
        // est récupérée par 2048.js
        this.meilleureTuile = 2;
    }

    /**
     * Méthode appelée une unique fois, à l'initialisation.
     * Elle construit la structure HTML de la grille, avec un container
     * et des div dont la class est "case".
     */
    construction(){
        // On crée et accroche notre element HTML à la page
        let container = document.createElement('div');
        container.id = "container";
        container.classList.add('container2048');
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
     * Remplie la grille de div (4 par lignes) dont la classe est "case"
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
     * Méthode qui fait en sorte qu'une tuile ne soit pas placée sur une tuile déjà existante.
     * Est utilisée dans un while de la méthode placerNouvelleTuileSurGrille().
     * @param ligne
     * @param colonne
     * @returns {boolean} true si la position est libre, false sinon
     */
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
        tuile.setValue(this.randomValue());

        // Si besoin de simuler une victoire rapidement :
        //tuile.setValue(512);
        //tuile.setValue(64);

        // Pour avoir une animation d'apparition
        tuile.setApparition(true);

        // On ajoute cette tuile à notre liste
        this.listeTuile.push(tuile);
    }

    /**
     * On a une chance sur 10 d'avoir un 4 comme nouvelle tuile
     * Utilisé par placerNouvelleTuileSurGrille() au moment du setValue de la tuile
     * @returns {number} Valeur de la nouvelle tuile
     */
    randomValue(){
        let val = Math.round(Math.random() * 10);
        if (val < 9){
            return 2;
        } else { return 4;}
    }

    /**
     * Méthodes qui efface dans un premier temps tous les anciens div de class tuile pour
     * les reconstruire en fonction des mouvements qu'il y a eu.
     * On itère sur notre listeTuile afin de construire un div "tuile" pour chaque tuile
     * Ce div est placé grace à la position (ligne/colonne) qui est extrait de l'objet tuile
     */
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

    /**
     * Lorsqu'un mouvement est décidé par l'utilisateur, si ce mouvemeny est permit,
     * alors un tour passe : il y a une création de tuile.
     * A la fin du tour, on met à jour notre grille, ce qui va générer les div en fonction
     * des tuiles.
     * @param direction
     * @return true si le tour était valide, false sinon
     */

    nouveauTour(direction){
        //console.log("Nouveau tour");
        //console.log(this.mouvementPossible(direction));
        // On vérifie si le mouvement est autorisé
        if(this.mouvementPossible(direction)){
            // Déplacement de toutes les tuiles dans la matrice
            this.deplaceTuileDansMatrice(direction);

            // Si la grille n'est pas full
            if(this.listeTuile.length < 16){
                // Création d'une nouvelle tuile
                this.placerNouvelleTuileSurGrille();
            }

            // mise à jour de la grille
            this.miseAJourGrille();

            // A la fin du tour, on dois enlever les marques des tuiles qui ont été fusionnées
            // (marque qui peremt d'éviter les doubles fusions lors du même tour)
            this.clearFusion();

            return true;
        }
        return false;
    }

    /**
     * Nettoie toutes les tuiles de leur propriété "fusion"
     */
    clearFusion(){
        this.listeTuile.forEach(tuile => {
            tuile.setFusion(true);
        })
    }

    /**
     * Cette méthode gère le déplacement des tuiles contenue dans listeTuile.
     * Elle regarde les alignements de case, ordonne les fusions si besoin
     * @param direction
     */
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
                    // Ici, il faut vérifier si deux cases adjacente sont de même
                    // valeur et si c'est le cas : les fusionner

                    if(this.fusionPossible(tuilesSurMemeLigne, direction)){

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
                    // Ici, il faut vérifier si deux cases adjacente sont de même
                    // valeur et si c'est le cas : les fusionner

                    if(this.fusionPossible(tuileSurMemeColonne, direction)){
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
     * Méthode qui itère sur la liste de tuile à la recherche de tuiles sur la même ligne
     * que la tuile passée en paramètre.
     * @param tuile
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

    /**
     * Méthode qui itère sur la liste de tuile à la recherche de tuiles sur la même colonne
     * que la tuile passée en paramètre.
     * @param tuile
     * @returns {[]}
     */
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
     * Fonction utilisée par sort pour faire un tri automatique de
     * l'array qui contient les alignements horizontaux
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

    /**
     * Fonction utilisée par sort pour faire un tri automatique de
     * l'array qui contient les alignements verticaux
     * @param a
     * @param b
     * @returns {number}
     */
    ordonneColonne(a,b){
        // a et b sont deux tuiles
        // Sort s'attends à recevoir 1 si a > b, -1 si a < b, 0 sinon
        if(a.ligne > b.ligne){ return 1;}
        else if (a.ligne < b.ligne){ return -1;}
        else {return 0;}
    }

    /**
     * Fonction qui permet de savoir si une fusion est possible sur une ligne/colonne
     * @param tuileSurMemeLigneOuColonne : array ordonné des cases d'une ligne
     * @param direction
     * @return true si une fusion est possible, false sinon
     */
    fusionPossible(tuileSurMemeLigneOuColonne, direction){
        // Maintenant qu'on a toute les tuiles, on ordonne notre tableau en fonction de
        // la colonne de l'element
        if(direction === MESSAGE.RIGHT || direction === MESSAGE.LEFT){
            tuileSurMemeLigneOuColonne.sort(this.ordonneLigne);
        } else {
            tuileSurMemeLigneOuColonne.sort(this.ordonneColonne);
        }
        // On va itérer sur la liste et on va comparer la valeur de la tuile
        // actuelle avec la prochaine
        for(let i = 0; i < tuileSurMemeLigneOuColonne.length - 1; i ++){
            if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i+1].getValue()){
                /*console.log("fusion possible entre ligne "
                    +tuileSurMemeLigneOuColonne[i].ligne +" colonne "+
                    tuileSurMemeLigneOuColonne[i].colonne+ "et ligne "+
                    tuileSurMemeLigneOuColonne[i+1].ligne +" colonne "+
                    tuileSurMemeLigneOuColonne[i+1].colonne);*/
                return true;
            }
        }
        return false;
    }

    /**
     * Pas de déplacement si toutes les tuiles sont collés vers la direction voulue
     * ET qu'aucune fusion n'est possible
     */
    mouvementPossible(direction){
        let tuilesSurMemeLigne = [];
        let tuilesSurMemeColonne = [];

        // Présomption false, dès que c'est true => au moins un mouvement possible

        // Le mur est la bord de la grille vers où les tuiles s'entassent
        // C'est l'indice de la ligne ou colonne
        let mur;
        switch (direction){
            case MESSAGE.RIGHT:
            case MESSAGE.DOWN:
                mur = 3;
                break;
            case MESSAGE.LEFT:
            case MESSAGE.UP:
                mur = 0;
                break;
        }

        for(let i = 0; i < this.listeTuile.length ; i ++){
            let tuile = this.listeTuile[i];
            tuilesSurMemeLigne = this.trouveAlignementHorinzontal(tuile);
            tuilesSurMemeColonne = this.trouveAlignementVertical(tuile);

            // Si une fusion horizontale est possible lors d'une déplacement horizontal, true
            if(this.fusionPossible(tuilesSurMemeLigne, direction)
                && (direction === MESSAGE.LEFT || direction === MESSAGE.RIGHT)){
                //console.log("Fusion horizontale possible");
                return true;
            }
            // Si une fusion verticale est possible lors d'une déplacement vertical, true
            if(this.fusionPossible(tuilesSurMemeColonne, direction)
                && (direction === MESSAGE.UP || direction === MESSAGE.DOWN)){
                //console.log("Fusion verticale possible");
                return true;
            }

            // Si j'ai deux cases sur la même ligne et que la somme de leur colonne
            // est différente de 5, ça veut dire qu'elle ne sont pas collée
            // Si j'en ai 3 et que la somme veut 1 + 2 + 3 = 6, elles sont collées à droite
            let sommeColonne = 0;
            let sommeLigne = 0;

            for(let c = 0; c < tuilesSurMemeLigne.length ; c ++){
                sommeColonne += tuilesSurMemeLigne[c].colonne;
            }
            for(let l = 0; l < tuilesSurMemeColonne.length ; l ++){
                sommeLigne += tuilesSurMemeColonne[l].ligne;
            }

            switch (tuilesSurMemeLigne.length){
                case 1:
                    if (sommeColonne !== 3 && direction === MESSAGE.RIGHT){return true;}
                    if (sommeColonne !== 0 && direction === MESSAGE.LEFT){return true;}
                    break;
                case 2:
                    if(sommeColonne !== 5 && direction === MESSAGE.RIGHT){return true;}
                    if (sommeColonne !== 1 && direction === MESSAGE.LEFT){return true;}
                    break;
                case 3:
                    if(sommeColonne !== 6 && direction === MESSAGE.RIGHT){return true;}
                    if (sommeColonne !== 3 && direction === MESSAGE.LEFT){return true;}
                    break;
            }

            switch (tuilesSurMemeColonne.length){
                case 1:
                    if (sommeLigne !== 3 && direction === MESSAGE.DOWN){return true;}
                    if (sommeLigne !== 0 && direction === MESSAGE.UP){return true;}
                    break;
                case 2:
                    if(sommeLigne !== 5 && direction === MESSAGE.DOWN){return true;}
                    if (sommeLigne !== 1 && direction === MESSAGE.UP){return true;}
                    break;
                case 3:
                    if(sommeLigne !== 6 && direction === MESSAGE.DOWN){return true;}
                    if (sommeLigne !== 3 && direction === MESSAGE.UP){return true;}
                    break;
            }
        }
        // si aucun des return true est exécuté
        return false;
    }

    /**
     * Fonction qui s'occupe de fusionner les tuiles prétendantes d'une même ligne ou colonne.
     * S'occupe d'une ligne ou colonne à la fois.
     * @param tuileSurMemeLigneOuColonne
     * @param direction
     */
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
                    if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i-1].getValue()
                        && tuileSurMemeLigneOuColonne[i].getFusion() && tuileSurMemeLigneOuColonne[i-1].getFusion()){
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
                    if(tuileSurMemeLigneOuColonne[i].getValue() === tuileSurMemeLigneOuColonne[i+1].getValue()
                        && tuileSurMemeLigneOuColonne[i].getFusion() && tuileSurMemeLigneOuColonne[i+1].getFusion()){
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

        // On augmente le score
        this.score += tuile1.value;

        // Afin de ne pas faire de double fusion lors du même tour, on marque la tuile survivante :
        tuile1.setFusion(false);

        // On regarde si c'est une nouvelle meilleure tuile:
        if(tuile1.getValue() > this.meilleureTuile){
            this.meilleureTuile = tuile1.getValue();
        }

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

    /**
     * Puisque le score est compté dans cette classe, 2048 doit le récuperer
     * pour ensuite l'envoyer à Ciment qui fera son affichage
     * @return {number} score actuel
     */
    getScore(){
        return this.score;
    }

    /**
     * Est récupérée par 2048.js afin de determiner si on a une victoire et
     * (en fin de partie) pouvoir envoyer la meilleure tuile au Profil.
     * @return {number}
     */
    getMeilleureTuile(){
        return this.meilleureTuile;
    }
}