class Trophee {
    constructor(type, description, img) {
        this.type = type; // 2048, DEMINEUR ou GENERAL
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
        return new Trophee(json.type, json.description, json.img);
    }
}
