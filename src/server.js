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
// let paquet = new CardPack(cards.cards);
// let cartes = paquet.getManyCards(3);
// for (let i in cartes) {
//   console.log(cartes[i]); //cartes[i].getImagePath() pour obtenir l'url de l'image
// }

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
  var grid = new Grid().grid;
  Cluedo.start();
  response.render("cluedo", { grid });
});

app.listen(config.app.port);
