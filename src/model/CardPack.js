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

  // Retourne la carte suivante
  getFollowingCard() {
    return this.pack.pop();
  }

  // Renvoie plusieurs cartes pour le début de partie
  getManyCards(how) {
    let cards = [];
    for (let i = 0; i < how; i++) {
      cards[i] = this.getFollowingCard();
    }
    return cards;
  }

  // Mélange le jeu
  shuffle() {
    this.pack = arrayShuffle(this.pack);
  }

  toString(){
    return this.pack.toString();
  }
}

module.exports = CardPack;
