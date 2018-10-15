class Joueur {

    constructor(id,pseudo,cartes){
        this.id=id;
        this.pseudo=pseudo;
        this.cartes=cartes;
        this.grille=new Grille();
    }

    getCartes(){
        return this.cartes;
    }

    pseudo() {
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