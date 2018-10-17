const config = require("../config.json");

// Définit une carte (ex: "salle de bal", "chandelier", ...)
class Card {
  constructor(name, label, type, image) {
    this.name = name;
    this.label = label;
    this.type = type;
    this.image = image;
  }

  getName() {
    return this.name;
  }

  getLabel() {
    return this.label;
  }

  getType() {
    return this.type;
  }

  getImage() {
    return (
      config.ressources.staticFilesRootPath +
      config.ressources.imagesPath +
      this.image
    );
  }
}

module.exports = Card;
