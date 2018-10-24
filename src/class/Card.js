const config = require("../config.json");

// Définit une carte (ex: "salle de bal", "chandelier", ...)
class Card {
  constructor(name, label, type, imagePath) {
    this.name = name;
    this.label = label;
    this.type = type;
    this.imagePath = imagePath;
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

  getImagePath() {
    let url = "http://" + config.app.baseUrl + ":" + config.app.port;
    let path =
      config.ressources.staticFilesRootPath +
      config.ressources.imagesPath +
      this.imagePath;
    return url + path;
  }
}

module.exports = Card;
