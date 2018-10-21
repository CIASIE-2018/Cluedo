// Modules
let express = require("express");
let Cluedo = require("./controller/CluedoController");
let Grid = require("./controller/GridController");
let session = require("./service/session");
let cookieSession = require("cookie-session");
let Card = require("./model/CardModel");
let CardPack = require("./model/CardPack");

// Data
const config = require("./config.json");
const cards = require("./cards.json");

let app = express();

// On créer un paquet de cartes pour la partie
let paquet = new CardPack(cards);
// On récupère une carte de chaque type (cartes à découvrir)
let hiddenCards = paquet.getHiddenCards();
if (config.app.debugMode) {
  for (let i in hiddenCards) {
    //console.log(hiddenCards[i]); //hiddenCards[i].getImagePath() pour obtenir l'url de l'image
  }
}

app.set("view engine", "twig");
app.set("views", "./src/views");

app.use(config.ressources.staticFilesRootPath, express.static("public"));
// Paramètre le système de session (voir session.js)
app.use(cookieSession({ secret: config.app.secretSession }));
app.use(session);

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cluedo", (request, response) => {
  //Test grille insjection en HTML
  var grid = new Grid().grid;

  //Test cartes insjection en HTML
  let paquet = new CardPack(cards);
  let ListOfAllCards = new CardPack(cards);

  let cartes = paquet.getManyCards(3);
  //console.log(cartes);

  
  Cluedo.start();
  response.render("cluedo", { grid, ListOfAllCards, cartes });
});

app.listen(config.app.port);
