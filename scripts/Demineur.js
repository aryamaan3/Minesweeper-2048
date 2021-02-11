class AbsDem extends Abs{
    constructor() {
        super();
    }

    /**
     *
     * @param niveau
     */
    init(niveau){
        console.log(niveau);
        //TODO
    }

    getMessage(message, pieceJointe){
        let result = "";

        if (message === MESSAGE.NIVEAU){
            this.init(pieceJointe);
        }

        else {
            result = super.recoitMessage(message, pieceJointe);
        }
        return result;
    }


}

class PresDem extends Pres{

    constructor() {
        super();

        this.grille = new Grille(true);
        //this.initPage();
    }

    getMessage(message, pieceJointe){
        //TODO
    }

    /**
     * genere la page et la methode pour choisir le niveau
     */
    initPage(){
        let header = document.getElementById("title");
        header.innerHTML = "Démineur";
        this.selectLevel();
    }

    /**
     * crée des boutons qui donnent le choix de niveau à l'utilisateur
     */
    selectLevel(){
        let div = document.createElement('div');
        div.id = "canvas";
        div.style.cssText = "position:absolute; top:300px; left:535px; text-align:center; border-style:solid"
        document.body.appendChild(div);
        //on crée le div

        let h1 = document.createElement('h2');
        h1.innerHTML="choisissez votre niveau";
        h1.style.cssText = "text-align:center; margin:auto;";
        div.appendChild(h1);

        let niv1 = document.createElement('button');
        niv1.innerHTML = "débutant";
        niv1.id = "1";
        niv1.classList.add('niveau');
        niv1.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1); //enleve tous les boutons afin de laisser la place à la grille
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 1); //communique le niveau au controleur
            this.grille.drawGrille(1); //dessine la grille
        };
        div.appendChild(niv1);

        let niv2 = document.createElement('button');
        niv2.innerHTML = "moyen";
        niv2.id = "2";
        niv2.classList.add('niveau');
        niv2.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 2);
            this.grille.drawGrille(2);
        };
        div.appendChild(niv2);

        let niv3 = document.createElement('button');
        niv3.innerHTML = "expert";
        niv3.id = "3";
        niv3.classList.add('niveau');
        niv3.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.ctrl.getMessageFromPresentation(MESSAGE.NIVEAU, 3);
            this.grille.drawGrille(3);
        };
        div.appendChild(niv3);

    }

    /**
     * enleve les boutons
     * @param div
     * @param n1 bouton 1
     * @param n2 bouton 2
     * @param n3 bouton 2
     * @param h1 balise h1
     */
    removeButtons(div, n1, n2, n3, h1){
        div.style.removeProperty("position");
        div.style.removeProperty("top");
        div.style.removeProperty("left");
        div.style.removeProperty("text-align");

        div.removeChild(n1);
        div.removeChild(n2);
        div.removeChild(n3);
        div.removeChild(h1);
        document.body.removeChild(div)
    }

}

class CtrlDem extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    getMessageFromParent(message){
        if (message === MESSAGE.DEMINEUR){
            //console.log("in INIT");
            //this.abs.getMessage(message)
            this.pres.initPage();
        }
    }

    getMessageFromAbstraction(message){
        //TODO
    }

    getMessageFromPresentation(message, piecejointe){
        if (message === MESSAGE.NIVEAU){
            switch(piecejointe){
                case(1):
                    this.abs.getMessage(message, piecejointe);
                    break;

                case(2):
                    this.abs.getMessage(message, piecejointe);
                    break;

                case(3):
                    this.abs.getMessage(message, piecejointe);
                    break;

            }
        }
    }
}