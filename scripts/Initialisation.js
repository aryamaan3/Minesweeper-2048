// Fonction qui est executée uniquement lorsque tout le HTML est chargé (cf cours M. BUFFA)
window.onload = function init(){

    let abs2048 = new Abs2048();
    let pres2048 = new Pres2048();
    let ctrl2048 = new Ctrl2048(abs2048, pres2048);

    let absDem = new AbsDem();
    let presDem = new PresDem();
    let ctrlDem = new CtrlDem(absDem, presDem);

    let absProfil = new AbsProfil();
    let presProfil = new PresProfil();
    let ctrlProfil = new CtrlProfil(absProfil, presProfil);

    let absCiment = new AbsCiment();
    let presCiment = new PresCiment();
    let ctrlCiment = new CtrlCiment(absCiment, presCiment);

    let absNav = new AbsNav();
    let presNav = new PresNav();
    let ctrlNav = new CtrlNav(absNav, presNav);

    ctrlCiment.addEnfant(ctrl2048);
    ctrlCiment.addEnfant(ctrlDem);
    ctrlCiment.addEnfant(ctrlProfil);
    ctrlCiment.addEnfant(ctrlNav);
    ctrlCiment.init();
}

function isEmpty(obj){ //verifie si un objet json est vide
    for (let cle in obj){
        if (obj.hasOwnProperty(cle)){
            return false;
        }
    }
    return true
}

