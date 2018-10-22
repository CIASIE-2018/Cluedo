    let Player = require('./PlayerController');
    let Grid = require('./GridController');
    let CardPack = require('../model/CardPack')
    let ListCard = require('../cards.json')

    //initialise la partie
    const start = function() {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/
        let g = new Grid();
        let p = new CardPack(ListCard);
        p.shuffle();
        let hugo = new Player(1,"hugo",p.getManyCards(3));
        g.placePlayer(1,1,1)
        console.log(g.toString())
        g.movePlayer(1,1,2)
        console.log(g.toString())
        
    }




module.exports = {start};