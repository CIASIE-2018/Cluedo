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

  // Pioche et renvoie plusieurs cartes !! Ne pas utiliser pour generer les cartes du début => VOIR getHiddenCards() !!
  getManyCards(how) {
    let cards = [];
    for (let i = 0; i < how; i++) {
      cards[i] = this.getFollowingCard();
    }
    return cards;
  }

  // Retire du paquet et renvoie une carte de chaque type pour le début de partie
  getHiddenCards() {
    var hiddenCharacter, hiddenWeapon, hiddenRoom;
    for (let i in this.pack) {
      // On retire et récupère une carte de chaque type dans le paquet
      let card = this.pack[i];
      if (hiddenCharacter === undefined && card.getType() === "character") {
        hiddenCharacter = this.pack.splice(i, 1);
      } else if (hiddenRoom === undefined && card.getType() === "room") {
        hiddenRoom = this.pack.splice(i, 1);
      } else if (hiddenWeapon === undefined && card.getType() === "weapon") {
        hiddenWeapon = this.pack.splice(i, 1);
      }

      // Si une carte de chaque type est prise, les renvoier sous forme de tableau
      if (
        hiddenWeapon != undefined &&
        hiddenCharacter != undefined &&
        hiddenRoom != undefined
      ) {
        return [hiddenCharacter, hiddenRoom, hiddenWeapon];
      }
    }
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
