class Grille{
    constructor() {
    }

    drawGrille(demineur){
        let div = document.createElement('div');
        div.id = "canvas";
        if (demineur){
            this.selectLevel(div);
        }

        else {
            div.style.cssText = "position:absolute; top:300px; left:520px; text-align:center";
            document.body.appendChild(div);

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            canvas.style.cssText = "border: 2px solid; border-radius: 15px; border-color: rgb(182, 174, 162)"
            canvas.id = "grilles";
            canvas.width = 4 * 100;
            canvas.height = 4 * 100;
            div.appendChild(canvas);

            let long = 4;
            let larg = 4;
            let tl = 100
            let tuile = new Image();
            tuile.onload = function (){
                console.log("image loaded");
            }
            tuile.src = 'assets/tile2.png';

            for (let i = long - 1; i >= 0; i -= 1) {
                for (let j = larg - 1; j >= 0; j -= 1) {
                    ctx.drawImage(tuile, i * tl, j * tl, tl, tl);
                }
            }
        }

    }

    selectLevel(div){
        div.style.cssText = "position:absolute; top:300px; left:535px; text-align:center; border-style:solid"
        document.body.appendChild(div);
        let h1 = document.createElement('h2');
        h1.innerHTML="choisissez votre niveau";
        h1.style.cssText = "text-align:center; margin:auto;";
        div.appendChild(h1);
        let niv1 = document.createElement('button');
        niv1.innerHTML = "débutant";
        niv1.id = "1";
        niv1.classList.add('niveau');
        /*let p = document.createElement('p');
        p.innerHTML = "débutant";
        p.style.cssText = ""
        niv1.appendChild(p);*/
        niv1.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.drawGrilleDem(1, div);
        };
        div.appendChild(niv1);

        let niv2 = document.createElement('button');
        niv2.innerHTML = "moyen";
        niv2.id = "2";
        niv2.classList.add('niveau');
        niv2.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.drawGrilleDem(2, div);
        };
        div.appendChild(niv2);

        let niv3 = document.createElement('button');
        niv3.innerHTML = "expert";
        niv3.id = "3";
        niv3.classList.add('niveau');
        niv3.onclick = () =>{
            this.removeButtons(div, niv1, niv2, niv3, h1);
            this.drawGrilleDem(3, div);
        };
        div.appendChild(niv3);

    }

    removeButtons(div, n1, n2, n3, h1){
        div.style.removeProperty("position");
        div.style.removeProperty("top");
        div.style.removeProperty("left");
        div.style.removeProperty("text-align");

        div.removeChild(n1);
        div.removeChild(n2);
        div.removeChild(n3);
        div.removeChild(h1);
    }

    drawGrilleDem(niveau, div){
        switch(niveau) {
            case(1):

                div.style.cssText = "position:absolute; top:300px; left:600px; text-align:center";
                document.body.appendChild(div);

                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                canvas.style.cssText = "border-style: solid"
                canvas.id = "grilles";
                canvas.width = 9 * 30;
                canvas.height = 9 * 30;
                div.appendChild(canvas);

                let long = 9;
                let larg = 9;
                let tl = 30;
                let tuile = new Image();
                tuile.onload = function (){
                    console.log("image loaded");
                }
                tuile.src = 'assets/tile.jpg';

                for (let i = long - 1; i >= 0; i -= 1) {
                    for (let j = larg - 1; j >= 0; j -= 1) {
                        ctx.drawImage(tuile, i * tl, j * tl, tl, tl);
                    }
                }
                break;

            case(2):
                div.style.cssText = "position:absolute; top:300px; left:475px; text-align:center";
                document.body.appendChild(div);

                let cvs = document.createElement('canvas');
                let context = cvs.getContext("2d");
                cvs.style.cssText = "border-style: solid"
                cvs.id = "grilles";
                cvs.width = 16 * 30;
                cvs.height = 16 * 30;
                div.appendChild(cvs);

                let longeur = 16;
                let largeur = 16;
                let taille = 30
                let tile = new Image();
                tile.onload = function (){
                    console.log("image loaded");
                }
                tile.src = 'assets/tile.jpg';

                for (let i = longeur - 1; i >= 0; i -= 1) {
                    for (let j = largeur - 1; j >= 0; j -= 1) {
                        context.drawImage(tile, i * taille, j * taille, taille, taille);
                    }
                }
                break;

            case(3):

                div.style.cssText = "position:absolute; top:300px; left:270px; text-align:center";
                document.body.appendChild(div);

                let can = document.createElement('canvas');
                let contx = can.getContext("2d");
                can.style.cssText = "border-style: solid"
                can.id = "grilles";
                can.width = 30 * 30;
                can.height = 16 * 30;
                div.appendChild(can);

                let len = 30;
                let wid = 16;
                let size = 30;
                let image = new Image();
                image.onload = function (){
                    console.log("image loaded");
                }
                image.src = 'assets/tile.jpg';

                for (let i = len - 1; i >= 0; i -= 1) {
                    for (let j = wid - 1; j >= 0; j -= 1) {
                        contx.drawImage(image, i * size, j * size, size, size);
                    }
                }
                break;

        }
    }
}