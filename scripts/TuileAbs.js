/**
 * tuiles utulisés par l'abstraction
 * stockés dans tabTuiles
 */
class TuileAbs{
    constructor(ligne, colonne) {
        this.ligne = ligne;
        this.colonne = colonne;
        this.hidden = true;
        this.mine = false;
    }

    isHidden(){
        return this.hidden;
    }

    isMine(){
        return this.mine;
    }

    setMine(){
        this.mine = true;
    }
}