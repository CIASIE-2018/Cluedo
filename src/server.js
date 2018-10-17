let Cluedo = require("./controller/CluedoController");

let Player = require('./controller/PlayerController');
let Grid = require('./controller/GridController');
let CardPack = require('./model/CardPack');
let ListCard = require('./cards.json');

let express = require("express");

const config = require("./config.json");

let app = express();

app.set("view engine", "twig");
app.set("views", "./src/views");

app.use(config.ressources.staticFilesRootPath, express.static("public"));

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cluedo", (request, response) => {
  //Test grille insjection en HTML
  var grid = new Grid().grid;

  //Test cartes insjection en HTML 
  var p = new CardPack(ListCard);
  p.shuffle();
  var cards = new Player(1,"hugo",p.getManyCards(3));
  //console.log(cards);

  Cluedo.start();
  response.render("cluedo", { grid,cards });
});

app.listen(config.app.port);
