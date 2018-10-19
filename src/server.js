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

app.set("view engine", "twig");
app.set("views", "./src/views");

app.use(config.ressources.staticFilesRootPath, express.static("public"));
// Paramètre le système de session (voir session.js)
app.use(cookieSession({ secret: config.app.secretSession }));
app.use(session);

// ---------  Pour tester le fcontionnement des cartes
// On créer un paquet
let paquet = new CardPack(cards.cards);
// On récupère une carte de chaque type (cartes à découvrir)
let hiddenCards = paquet.getHiddenCards();
for (let i in hiddenCards) {
  console.log(hiddenCards[i]); //hiddenCards[i].getImagePath() pour obtenir l'url de l'image
}

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cluedo", (request, response) => {
  //Test grille insjection en HTML
  var grid = new Grid().grid;

  //Test cartes insjection en HTML
  let paquet = new CardPack(cards.cards);
  let cartes = paquet.getManyCards(3);
  Cluedo.start();
  response.render("cluedo", { grid, cartes });
});

app.listen(config.app.port);
