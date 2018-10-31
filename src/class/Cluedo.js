    let Player = require('./Player');
    let CardPack = require('./CardPack')
    let ListCard = require('../cards.json')
    //let board = new Grid();
    //initialise la partie
    const start = function(board, MyID, Place) {
        board.placePlayer(MyID,Place[0],Place[1]);
    }
module.exports = {start};