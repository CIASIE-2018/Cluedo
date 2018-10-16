class PlayerController {

    constructor(id,pseudo,x,y){
        this.id=id;
        this.pseudo=pseudo;
        this.x=x;
        this.y=y;
        //this.cartes=cartes;
        //this.grille=new Grille();
        console.log("np")
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