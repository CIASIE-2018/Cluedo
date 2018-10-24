    let Player = require('./Player');
    let CardPack = require('./CardPack')
    let ListCard = require('../cards.json')
    //let board = new Grid();
    //initialise la partie
    const start = function(board) {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/       
        let pack = new CardPack(ListCard);
        pack.shuffle();
        let hugo = new Player(1,"hugo",pack.getManyCards(3));
        console.log(hugo.getCard())
        board.placePlayer(1,1,1);
        // console.log(board)
    }




module.exports = {start};