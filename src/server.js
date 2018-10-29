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
  if ((TableOFPlayer.indexOf(MyUuiD) === -1) && (PlayerMax < 6)) {  //Premiere connexion du joueur
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
let ListOfAllCards = new CardPack(cards); // All cards insjection en HTML pour du visuel

//Différent tour :
//  RollDice : lance les dés
//  Move : déplacement du joueur
//  Offer : propose une hypothese ou une accusation
let PlayTurnOfPlayer = {
  TurnIdPlayer: null,
  Action: "RollDice"
};
let RollDicePlayer = null;
let Offer = {
  Status: false, //Offre effectuer(true) ou non (false) 
  Log: "" //Offre save for logerror
};





//Nombre de Cartes en fonction du nombre de joueurs
// NB de carte total 21 - 3 = 18
let NumberOfCardPlayers = [[18], [9, 9], [6, 6, 6], [5, 5, 4, 4], [4, 4, 4, 3, 3], [3, 3, 3, 3, 3, 3]];
let PlaceStart = [[5,0],[18,0],[24,9],[24,14],[7,23],[0,16]];

app.get("/cluedo", (request, response) => {
  if (PlayerMax === 1) {
    throw 'Nombre de joueurs insuffisant';
  } else {
    PlayTurnOfPlayer.TurnIdPlayer = TableOFPlayer[0]; //Premier joueur qui va jouer
    let MyUuiD = request.session.player.uid;
    let cardPack = pack.getManyCards(NumberOfCardPlayers[PlayerMax - 1][TableOFPlayer.indexOf(MyUuiD)]);
    Cluedo.start(board, TableOFPlayer.indexOf(MyUuiD)+1, cardPack, PlaceStart[TableOFPlayer.indexOf(MyUuiD)]);
    response.render("cluedo", { board, ListOfAllCards, cardPack, MyUuiD });
  }
});






// SOCKET
serverSocket.on("connection", clientSocket => {
  // Lorsque un client se connecte
  //console.log("Client connected");


  clientSocket.on("rollTheDice", msg => {
    if (msg === PlayTurnOfPlayer.TurnIdPlayer) {
      if (PlayTurnOfPlayer.Action === "RollDice") {
        let firstRoll = Math.floor(Math.random() * 6) + 1;
        let SecondRoll = Math.floor(Math.random() * 6) + 1;
        RollDicePlayer = (firstRoll + SecondRoll);
        let sum = firstRoll + " : " + SecondRoll + " = " + RollDicePlayer;
        clientSocket.emit("sum", sum).disconnect();
        //PlayTurnOfPlayer.Action = "Move";
        PlayTurnOfPlayer.Action = "Offer"; //Le temps que le Move soit pret
      } else {
        error = "Tu as déjà lancé les dés.</br>Tu as obtenu " + RollDicePlayer + ".";
        clientSocket.emit('sum', error).disconnect();
      }
    } else {
      error = "Ce n'est pas à toi de jouer";
      clientSocket.emit('sum', error).disconnect();
    }
  });

  clientSocket.on("Move", msg => {
    //Try Response of Move player
  });

  clientSocket.on("Hypothesis", msg => {
    if (msg[0] == PlayTurnOfPlayer.TurnIdPlayer) {
      if (PlayTurnOfPlayer.Action === "Offer") {
        if (Offer.Status === false) {
          console.log("Hypothesis : " + msg[1].join(", "));
          Offer.Log = "Hypothesis : " + msg[1].join(", ");

          //Hypothese action

          Offer.Status = true;
        } else {
          error = "Tu as déja fais une hypothèse :</br>" + Offer.Log + "</br> Attend de recevoir les cartes.";
          clientSocket.emit('LogErrorHypo', error).disconnect();
        }
      } else {
        error = "Tu dois jouer avant de faire une hypothèse.";
        clientSocket.emit('LogErrorHypo', error).disconnect();
      }
    } else {
      error = "Ce n'est pas à toi de jouer";
      clientSocket.emit('LogErrorHypo', error).disconnect();
    }
    clientSocket.disconnect();
  });

  clientSocket.on("Accused", msg => {
    if (msg[0] == PlayTurnOfPlayer.TurnIdPlayer) {
      if (PlayTurnOfPlayer.Action === "Offer") {
          console.log("Accused : " + msg[1].join(", "));

          //Accusation action
          //Fin de partie ou exclusion du joueur

      } else {
        error = "Tu dois jouer avant de faire une accusation.";
        clientSocket.emit('LogErrorAccu', error).disconnect();
      }
    } else {
      error = "Ce n'est pas à toi de jouer";
      clientSocket.emit('LogErrorAccu', error).disconnect();
    }
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