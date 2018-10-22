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
let paquet = new CardPack(cards);
// On récupère une carte de chaque type (cartes à découvrir)
let hiddenCards = paquet.getHiddenCards();
if (config.app.debugMode) {
  for (let i in hiddenCards) {
    //console.log(hiddenCards[i]); //hiddenCards[i].getImagePath() pour obtenir l'url de l'image
  }
}
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

// Route pour rejoindre une partie (appelée quand appuyé sur bouton "jouer")
app.get("/join", (request, response) => {
  // Création d'un objet de réponse pour tester
  let jsonResponse = {
    gameStatus: null,
    error: null
  };
  // Si la partie peut acceuilir encore un joueur
  if (game.getPlayers().length < config.settings.maxPlayer) {
    // Si le joueur n'est pas déja dans la partie
    if (!game.containsPlayer(request.session.player.uid)) {
      // On ajoute le joueur à la partie et on forme la réponse JSON
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
  // Dans tous les cas envoi de la réponse
  response.json(jsonResponse);
});

app.get("/cluedo", (request, response) => {
  //Test grille insjection en HTML
  var grid = new Grid();
  //Test cartes insjection en HTML
  let paquet = new CardPack(cards);
  let ListOfAllCards = new CardPack(cards);

  let cartes = paquet.getManyCards(3);
  //console.log(cartes);  
  Cluedo.start();
  response.render("cluedo", { grid, ListOfAllCards, cartes });
});

app.listen(config.app.port);


