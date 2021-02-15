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

}