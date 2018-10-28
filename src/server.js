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

app.set("view engine", "twig");
app.set("views", "./src/views");

// MIDDLEWARES
app.use(config.ressources.staticFilesRootPath, express.static("public"));
// Paramètre le système de session (voir session.js)
app.use(cookieSession({ secret: config.app.secretSession }));
app.use(session);





//Tableau de sauvegarde des players
let TableOFPlayer = new Array();
let PlayerMax = 0;

app.get("/", (request, response) => {
  //Sauvergarde des joueurs
  let MyUuiD = request.session.player.uid;

  //Si l'Uuid n'existe pas && Nombre Max de joueurs dans la partie
  if ((TableOFPlayer.indexOf(MyUuiD) == -1) && (PlayerMax < 6)) {  //Premiere connexion du joueur
    TableOFPlayer.push(MyUuiD);
    PlayerMax++;
    response.render("index", { TableOFPlayer, MyUuiD });
  } else if (TableOFPlayer.includes(MyUuiD)) { //Le joueur est déjà dans le lobby 
    response.render("index", { TableOFPlayer, MyUuiD });
  } else { //Trop de joueurs connectés
    throw 'TooManyConnection';
  }
});





//Variables ne doivent etre chargées qu'une seule fois
var board = new Board(); //Grille insjection en HTML
let pack = new CardPack(cards); //Pack du jeu
let hidden = pack.getHiddenCards(); //Retour des cartes à découvrir

//Différent tour : RollDice, Move, Offer 
let PlayTurnOfPlayer = {
  TurnIdPlayer: null,
  Action: "RollDice"
};
let RollDicePlayer = null;

let ListOfAllCards = new CardPack(cards); // All cards insjection en HTML pour du visuel

//Nombre de Cartes en fonction du nombre de joueurs
// NB de cartes total 21 - 3 = 18
let NumberOfCardPlayers = [[18], [9, 9], [6, 6, 6], [5, 5, 4, 4], [4, 4, 4, 3, 3], [3, 3, 3, 3, 3, 3]];

app.get("/cluedo", (request, response) => {
  if (PlayerMax == 1) {
    throw 'Nombre de joueurs insuffisant';
  } else {
    PlayTurnOfPlayer.TurnIdPlayer = TableOFPlayer[0]; //Premier joueur qui va jouer
    let MyUuiD = request.session.player.uid;
    let cardPack = pack.getManyCards(NumberOfCardPlayers[PlayerMax - 1][TableOFPlayer.indexOf(request.session.player.uid)]);
    Cluedo.start(board, request.session.player.uid, cardPack);
    response.render("cluedo", { board, ListOfAllCards, cardPack, MyUuiD });
  }
});






// SOCKET
serverSocket.on("connection", clientSocket => {
  // Lorsque un client se connecte
  //console.log("Client connected");

  
  clientSocket.on("rollTheDice", msg => {
    if (msg == PlayTurnOfPlayer.TurnIdPlayer) {
      let firstRoll = Math.floor(Math.random() * 6) + 1;
      let SecondRoll = Math.floor(Math.random() * 6) + 1;
      let sum = firstRoll + " : " + SecondRoll + " = " + (firstRoll + SecondRoll);
      clientSocket.emit("sum", sum).disconnect();
      PlayTurnOfPlayer[1] = "Move";
    } else {
      error = "NotYourTurnToPlay";
      clientSocket.emit('sum', error).disconnect();
    }
  });

  clientSocket.on("Hypothesis", msg => {
    console.log("Hypothesis : " + msg.join(", "));
    clientSocket.disconnect();
  });

  clientSocket.on("Accused", msg => {
    console.log("Accused : " + msg.join(", "));
    clientSocket.disconnect();
  });

  clientSocket.on("disconnect", () => {
    //console.log("Client disconnected");
  });
});

server.listen(config.app.port, () => {
  console.log(
    "Server running at http://" + config.app.baseUrl + ":" + config.app.port
  );
});






// Test de la websocket
//app.get("/socket", (request, response) => {
//  response.render("socket");
//});
//
//// Route pour rejoindre une partie (appelée quand appuyé sur bouton "jouer")
//app.get("/join", (request, response) => {
//  // Création d'un objet de réponse pour tester
//  let jsonResponse = {
//    gameStatus: null,
//    error: null
//  };
//  // Si la partie peut acceuilir encore un joueur
//  if (game.getPlayers().length < config.settings.maxPlayers) {
//    // Si le joueur n'est pas déja dans la partie
//    if (!game.containsPlayer(request.session.player.uid)) {
//      // On ajoute le joueur à la partie et on forme la réponse JSON
//      game.addPlayer(request.session.player);
//      jsonResponse.gameStatus = "Game sucessfully joined";
//    } else {
//      jsonResponse.gameStatus = "Game not joined";
//      jsonResponse.error = "Error: you are already in this game";
//    }
//  } else {
//    jsonResponse.gameStatus = "Game not joined";
//    jsonResponse.error = "Error: lobby is full";
//  }
//  // Dans tous les cas envoi de la réponse
//  response.json(jsonResponse);
//});