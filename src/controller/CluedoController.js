    let Player = require('./PlayerController');
    let Grid = require('./GridController');
    let CardPack = require('../model/CardPack')

    //initialise la partie
    const start = function() {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/
        let g = new Grid();
        let p = new CardPack({});
        let hugo = new Player("hugo",p);
        g.placePlayer(1,1,1);
        
    }




module.exports = {start};