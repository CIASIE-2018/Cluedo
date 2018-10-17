class PlayerController {

    constructor(id,pseudo,cartes){
        this.id=id;
        this.pseudo=pseudo;
        this.cartes=cartes;
        //this.grille=new Grille();
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

    //methode pour un lancer deux dés a 6 faces
    rollTheDice(){
        let d1=Math.floor(Math.random() * 6) + 1 ;
        let d2=Math.floor(Math.random() * 6) + 1 ;
        return(d1+d2);
    }

}
module.exports = PlayerController;