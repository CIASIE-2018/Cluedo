const Player = require("../model/PlayerModel");
const uuidv4 = require("uuid/v4");

var session = (req, res, next) => {
  // si le navigateur n'a pas de session, on lui crée une session contenant le player
  if (req.session.player === undefined) {
    let player = new Player(uuidv4(), null);
    req.session.player = player;
  }
  next();
};

module.exports = session;
