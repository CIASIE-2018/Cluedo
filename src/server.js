// Modules
let express = require("express");
let Cluedo = require("./controller/CluedoController");
let Grid = require("./controller/GridController");
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
// let paquet = new CardPack(cards.cards);
// let cartes = paquet.getManyCards(3);
// for (let i in cartes) {
//   console.log(cartes[i]);
// }

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cluedo", (request, response) => {
  var grid = new Grid().grid;
  Cluedo.start();
  response.render("cluedo", { grid });
});

app.listen(config.app.port);
