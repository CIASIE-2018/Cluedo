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
}
module.exports = Player;