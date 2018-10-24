class Player {

    constructor(id,pseudo,cards){
        this.id=id;
        this.pseudo=pseudo;
        this.cards=cards;
    }

    getCard(){
        return this.cards;
    }

    getPseudo() {
        return this.pseudo;
    }

    askCartes(joueur,cards) {
        if(joueur.checkCartes(joueur.getCartes(),cards)){
            //possède une/plusieurs cards
        } else {
            //joueur suivant
        }
    }


}
module.exports = Player;