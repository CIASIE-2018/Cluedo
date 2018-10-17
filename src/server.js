// Modules
let express = require("express");
let Cluedo = require("./controller/CluedoController");
let Grid = require("./controller/GridController");
let Player = require("./controller/PlayerController");
let ListCard = require('./cards.json');

const Card = require("./model/CardModel");
const CardPack = require("./model/CardPack");

// Data
const config = require("./config.json");
const cards = require("./cards.json");

let app = express();

app.set("view engine", "twig");
app.set("views", "./src/views");

app.use(config.ressources.staticFilesRootPath, express.static("public"));

// ---------  Pour tester le fcontionnement des cartes
let paquet = new CardPack(cards.cards);
let cartes = paquet.getManyCards(3);
for (let i in cartes) {
  console.log(cartes[i]); //cartes[i].getImagePath() pour obtenir l'url de l'image
}

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cluedo", (request, response) => {
  //Test grille insjection en HTML
  var grid = new Grid().grid;

  //Test cartes insjection en HTML 
  var p = new CardPack(ListCard);
  p.shuffle();
  var cards = new Player(1, "hugo", p.getManyCards(3));
  //console.log(cards);
  Cluedo.start();
  response.render("cluedo", { grid, cards });
});

app.listen(config.app.port);