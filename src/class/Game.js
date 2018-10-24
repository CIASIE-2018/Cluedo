const CardPack = require("./CardPack");
const cards = require("../cards.json");

const config = require("../config.json");
const debug = require("../service/debugLogger");

class Game {
  constructor() {
    this.cardPack = new CardPack(cards);
    this.players = [];
    this.isStarted = false;
    this.isReady = false;
  }

  joinGame(player) {
    // Si une partie est déja en cours
    if (this.isStarted) {
      throw "Error: a game is already started";
    } else {
      // Si il reste de la place dans la partie
      if (this.players.length < config.settings.maxPlayers) {
        for (let i in this.players) {
          // Si le joueur est déja dans la partie
          if (this.players[i].uid === player.uid) {
            throw "Error: player already in the lobby";
          }
        }
        // Si le joueur n'est pas déja dans le lobby
        this.players.push(player);
        this.updateIsReady();
        debug.log("Connexion au lobby \t" + player.name + "\t" + player.uid);
      } else {
        throw "Error: lobby is full";
      }
    }
  }

  quitGame(player) {
    let playerDeleted = false;
    for (let i in this.players) {
      if (this.players[i].uid === player.uid && playerDeleted === false) {
        this.players.splice(i, 1);
        this.playerDeleted = true;
        this.updateIsReady();
        debug.log("Déconnexion du lobby \t" + player.name + "\t" + player.uid);
      }
    }
  }

  // Met à jour la variable isReady
  updateIsReady() {
    const playerCount = this.players.length;
    const settings = config.settings;

    if (
      playerCount >= settings.minPlayers &&
      playerCount <= settings.maxPlayers
    ) {
      this.isReady = true;
      debug.log("Game is ready to start");
    } else {
      this.isReady = false;
      debug.log("Game is not ready to start yet");
    }
  }
}

module.exports = Game;
