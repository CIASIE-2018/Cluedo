var session = (req, res, next) => {
  const Player = require("../model/PlayerModel");
  const uuidv4 = require("uuid/v4");

  // si le navigateur n'a pas de session, on lui crée une session contenant le player
  if (req.session.player === undefined) {
    let player = new Player({ uid: uuidv4() });
    req.session.player = player;
    console.log("New player : " + player.getUid());
  }
  next();
};

module.exports = session;
