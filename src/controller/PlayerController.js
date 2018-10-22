class PlayerController {

    constructor(id,pseudo,cartes){
        this.id=id;
        this.pseudo=pseudo;
        this.cartes=cartes;
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


}
module.exports = PlayerController;