
import { barreNav } from "./BarreNavigation.js";

// Fonction qui est executée uniquement lorsque tout le HTML est chargé (cf cours M. BUFFA)
window.onload = function init(){

    let abs2048 = new Abs2048();
    let pres2048 = new pres2048();
    let ctrl2048 = new ctrl2048(abs2048, pres2048);

    let absDem = new absDem();
    let presDem = new presDem();
    let ctrlDem = new ctrlDem(absDem, presDem);

    let absProfil = new absProfil();
    let presProfil = new presProfil();
    let ctrlProfil = new ctrlProfil(absProfil, presProfil);

    let absCiment = new absCiment();
    let presCiment = new presCiment();
    let ctrlCiment = new ctrlCiment(absCiment, presCiment);

    ctrlCiment.addEnfant(ctrl2048);
    ctrlCiment.addEnfant(ctrlDem);
    ctrlCiment.addEnfant(ctrlProfil);
    ctrlCiment.init();

    barreNav();
}

