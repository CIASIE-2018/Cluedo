const config = require("./config.json");

// Définit une carte (ex: "salle de bal", "chandelier", ...)
class Card {
  constructor(name, type, image) {
    this.name = name;
    this.type = type;
    this.image = image;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getImage() {
    return (
      this.config.ressources.staticFilesRootPath +
      this.config.ressources.imagePath +
      this.image
    );
  }
}

module.exports = Card;
