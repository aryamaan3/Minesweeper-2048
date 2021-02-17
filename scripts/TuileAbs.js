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
        this.indice = undefined;
    }

    isHidden(){
        return this.hidden;
    }

    setDecouvert(){
        this.hidden = false;
    }

    isMine(){
        return this.mine;
    }

    setMine(){
        this.mine = true;
    }

    setIndice(indice){
        this.indice = indice;
    }

    getIndice(){
        return this.indice;
    }
}