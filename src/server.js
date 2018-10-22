// Modules
let express = require("express");
let Cluedo = require("./controller/CluedoController");
let Grid = require("./controller/GridController");
let session = require("./service/session");
let cookieSession = require("cookie-session");
let Card = require("./model/CardModel");
let CardPack = require("./model/CardPack");
let Player = require("./model/PlayerModel");
let Game = require("./model/Game");

// Data
const config = require("./config.json");
const cards = require("./cards.json");

let app = express();

let game = new Game([], null);
// On créer un paquet de cartes pour la partie
game.setCardPack(new CardPack(cards));

app.set("view engine", "twig");
app.set("views", "./src/views");

app.use(config.ressources.staticFilesRootPath, express.static("public"));
// Paramètre le système de session (voir session.js)
app.use(cookieSession({ secret: config.app.secretSession }));
app.use(session);

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/join", (request, response) => {
  let jsonResponse = {
    gameStatus: null,
    error: null
  };
  if (game.getPlayers().length < config.settings.maxPlayer) {
    if (!game.containsPlayer(request.session.player.uid)) {
      game.addPlayer(request.session.player);
      jsonResponse.gameStatus = "Game sucessfully joined";
    } else {
      jsonResponse.gameStatus = "Game not joined";
      jsonResponse.error = "Error: you are already in this game";
    }
  } else {
    jsonResponse.gameStatus = "Game not joined";
    jsonResponse.error = "Error: lobby is full";
  }
  response.json(jsonResponse);
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
