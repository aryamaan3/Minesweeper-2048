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
}
