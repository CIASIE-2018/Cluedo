    let Player = require('./PlayerController');
    let Grid = require('./GridController');
    let CardPack = require('../model/CardPack')
    let ListCard = require('../cards.json')
    //let grid = new Grid();
    //initialise la partie
    const start = function(grid) {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/
        
        let p = new CardPack(ListCard);
        p.shuffle();
        let hugo = new Player(1,"hugo",p.getManyCards(3));
        console.log(hugo.getCard())
        grid.placePlayer(1,1,1);
        console.log(grid)
        
    }




module.exports = {start};