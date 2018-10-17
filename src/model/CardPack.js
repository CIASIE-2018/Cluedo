const arrayShuffle = require("array-shuffle");
const Card = require("./CardModel");

// Définit un paquet de cartes
class CardPack {
  // prend en paramètre un array contenant des cartes
  constructor(cardsPack) {
    this.pack = [];
    for (let i in cardsPack) {
      this.pack.push(
        new Card(
          cardsPack[i].name,
          cardsPack[i].label,
          cardsPack[i].type,
          cardsPack[i].image
        )
      );
    }
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

  toString() {
    return this.pack.toString();
  }
}

module.exports = CardPack;
