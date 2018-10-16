    let Player = require('./PlayerController');
    let Grid = require('./GridController');

    const start = function() {
        /*let LogService = require('../service/logService');
        LogService.write("ntm");*/
        let hugo = new Player(1,"hugo");
        let g = new Grid();
        g.placePlayer(1,1,1);
        g.toString();
    }




module.exports = {start};