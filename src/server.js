// Modules
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Cluedo = require("./class/Cluedo");
const Board = require("./class/Board");
const session = require("./service/session");
const cookieSession = require("cookie-session");
const Card = require("./class/Card");
const CardPack = require("./class/CardPack");
const PlayerSession = require("./class/PlayerSession");
const game = require("./class/GameSession");

// Data
const config = require("./config.json");
const cards = require("./cards.json");

// Instanciation du serveur HTTP et de la websocket
let app = express();
let server = http.createServer(app);
let serverSocket = socketIO(server);

// let game = new Game([], null);
// // On créer un paquet de cards pour la partie
// let paquet = new CardPack(cards);
// // On récupère une carte de chaque type (cards à découvrir)
// let hiddenCards = paquet.getHiddenCards();
// if (config.app.debugMode) {
//   for (let i in hiddenCards) {
//     //console.log(hiddenCards[i]); //hiddenCards[i].getImagePath() pour obtenir l'url de l'image
//   }
// }
// game.setCardPack(new CardPack(cards));

app.set("view engine", "twig");
app.set("views", "./src/views");

// MIDDLEWARES
app.use(config.ressources.staticFilesRootPath, express.static("public"));
// Paramètre le système de session (voir session.js)
app.use(cookieSession({ secret: config.app.secretSession }));
app.use(session);

// ROUTES
app.get("/", (request, response) => {
  response.render("index");
});

// Test de la websocket
app.get("/socket", (request, response) => {
  response.render("socket");
});

// Route pour rejoindre une partie (appelée quand appuyé sur bouton "jouer")
app.get("/join", (request, response) => {
  // Création d'un objet de réponse pour tester
  let jsonResponse = {
    gameStatus: null,
    error: null
  };
  // Si la partie peut acceuilir encore un joueur
  if (game.getPlayers().length < config.settings.maxPlayers) {
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
  var board = new Board();
  //Test cards insjection en HTML
  let pack = new CardPack(cards);
  let ListOfAllCards = new CardPack(cards);

  let cardPack = pack.getManyCards(3);
  //console.log(cards);
  Cluedo.start(board);
  response.render("cluedo", { board, ListOfAllCards, cardPack });
});

// SOCKET
serverSocket.on("connection", clientSocket => {
  // Lorsque un client se connecte
  console.log("Client connected");

  // Lorsque un client nous envoie un évenemment "message"
  clientSocket.on("rollTheDice", msg => {
    let firstRoll = Math.floor(Math.random() * 6) + 1;
    let SecondRoll = Math.floor(Math.random() * 6) + 1;
    let sum = firstRoll + " : " + SecondRoll + " = " + (firstRoll + SecondRoll);
    clientSocket.emit("sum", sum).disconnect();
  });


  clientSocket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(config.app.port, () => {
  console.log(
    "Server running at http://" + config.app.baseUrl + ":" + config.app.port
  );
});
