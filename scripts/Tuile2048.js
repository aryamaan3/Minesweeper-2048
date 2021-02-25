/**
 * Tuile du jeu 2048, est contenu dans un div de la grille
 */
class Tuile2048{
    constructor() {
        // Une tuile a une position dans la grille
        this.ligne = -1;
        this.colonne = -1;

        // Une valeur = 2, 4, 8, 16 ...
        this.value = 0;

        // Variable qui permet de savoir si il faut faire une
        // animation lors de l'apparition d'une nouvelle tuile
        // (à chaque tour)
        this.apparition = false;

        // Marque pour savoir si la case a déjà été fusionnée une première
        // fois au cours de ce tour. Permet d'éviter les doubles fusions
        // lors d'un même tour.
        this.fusion = true;
        // A la fin d'un tour, on va itérer sur les tuiles pour réinitialiser
        // ces valeurs
    }

    setLigne(ligne){
        this.ligne = ligne;
    }

    setColonne(colonne){
        this.colonne = colonne;
    }

    setValue(value){
        this.value = value;
    }

    getValue(){
        return this.value;
    }

    setApparition(bool){
        this.apparition = bool;
    }

    getApparition(){
        return this.apparition;
    }

    getFusion(){
        return this.fusion;
    }

    setFusion(bool){
        this.fusion = bool;
    }

}