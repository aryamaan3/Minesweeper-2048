class Trophee {
    constructor(type, id, description, img) {
        this.type = type; // 2048, DEMINEUR ou GENERAL
        this.id = id; // Ex : 5min2048
        this.description = description;
        this.img = img; // url de l'image
    }

    /**
     * Render automatiquement le HTML
     * @return {HTMLDivElement}
     */
    render(){
        const trophee = document.createElement("div");
        trophee.className = "trophee";

        const img = document.createElement("img");
        img.src = this.img;
        img.height = 60;
        img.width = 60;
        img.onload = function () {console.log("Loaded trophee")};
        trophee.appendChild(img);

        const description = document.createElement("p");
        description.innerHTML = this.description;
        trophee.appendChild(description);

        return trophee;
    }

    /**
     * Lorsqu'on récupère les trophées dans localstorage, ils sont au format JSON
     * on les parse pour avoir un objet mais cet objet !== Trophee
     * on doit donc convertir l'objet lambda en un nouveau Trophee
     * @param json
     * @return {Trophee}
     */
    static revive(json){
        return new Trophee(json.type, json.id, json.description, json.img);
    }

    static afficher(texte){
        let container = document.getElementById('container');
        let panneau = document.createElement('div');
        panneau.id = "panneau";
        panneau.innerHTML = "Nouvelle Trophée gagné : <br>" + texte;

        container.after(panneau);

        setTimeout(() => {
            document.body.removeChild(panneau);
        }, 3000)
    }

}
