    let Player = require('./PlayerController');
    let CardPack = require('../model/CardPack')
    let ListCard = require('../cards.json')
    //let grid = new Grid();
    //initialise la partie
    const start = function(grid) {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/
<<<<<<< HEAD
        let g = new Grid();
        let p = new CardPack(ListCard);
        p.shuffle();
        let hugo = new Player(1,"hugo",p.getManyCards(3));
        //console.log(hugo.getCard())
        g.placePlayer(1,1,1);        
=======
        
        let pack = new CardPack(ListCard);
        pack.shuffle();
        let hugo = new Player(1,"hugo",pack.getManyCards(3));
        console.log(hugo.getCard())
        grid.placePlayer(1,1,1);
        console.log(grid)
        
>>>>>>> 5c025e13a53a2adfd848b485d0116101769b3cc9
    }




module.exports = {start};