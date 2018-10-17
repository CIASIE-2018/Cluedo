class PlayerController {

    constructor(id,pseudo){
        this.id=id;
        this.pseudo=pseudo;
        //this.cartes=cartes;
        //this.grille=new Grille();
        console.log("np");
    }

    getCard(){
        return this.cartes;
    }

    getPseudo() {
        return this.pseudo;
    }

    askCartes(joueur,cartes) {
        if(joueur.checkCartes(joueur.getCartes(),cartes)){
            //possède une/plusieurs cartes
        } else {
            //joueur suivant
        }
    }

    rollTheDice(){
        let d1=Math.floor(Math.random() * 6) + 1 ;
        let d2=Math.floor(Math.random() * 6) + 1 ;
        return(d1+d2);
    }

}
module.exports = PlayerController;