class GameSession {
  constructor(players, cardPack) {
    this.players = players;
    this.cardPack = cardPack;
  }

  getPlayers() {
    return this.players;
  }

  containsPlayer(uid) {
    for (let i in this.players) {
      if (this.players[i].uid === uid) {
        return true;
      }
    }
    return false;
  }

  getCardPack() {
    return this.getCardPack;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setCardPack(cardPack) {
    this.cardPack = cardPack;
  }
}

module.exports = GameSession;
