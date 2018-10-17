const arrayShuffle = require("array-shuffle");

// Définit un paquet de cartes
class CardPack {
  constructor(pack) {
    this.pack = pack.cards;
    this.shuffle();
  }

  getPack() {
    return this.pack;
  }

  // Mélange le jeu
  shuffle() {
    this.pack = arrayShuffle(this.pack);
  }
}

module.exports = CardPack;
