    let Player = require('./Player');
    let CardPack = require('./CardPack')
    let ListCard = require('../cards.json')
    //let board = new Grid();
    //initialise la partie
    const start = function(board, MyID, MyCard) {
        let hugo = new Player(MyID,"hugo",MyCard);
        console.log(hugo);
        board.placePlayer(1,1,1);
    }




module.exports = {start};