    let Player = require('./PlayerController');
    let CardPack = require('../model/CardPack')
    let ListCard = require('../cards.json')
    //let grid = new Grid();
    //initialise la partie
    const start = function(grid) {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/       
        let pack = new CardPack(ListCard);
        pack.shuffle();
        let hugo = new Player(1,"hugo",pack.getManyCards(3));
        console.log(hugo.getCard())
        grid.placePlayer(1,4,6);
        grid.movePlayer(1,3,6);
        // console.log(grid)
    }




module.exports = {start};