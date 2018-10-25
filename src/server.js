// Modules
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const expressSession = require("express-session");
const sharedSession = require("express-socket.io-session");
const uuid = require("uuid/v4");

const Game = require("./class/Game");

// Data
const config = require("./config.json");
const cards = require("./cards.json");

// Instanciation du serveur HTTP et de la websocket
let app = express();
let server = http.createServer(app);
let io = socketIo(server);
let session = expressSession({
  secret: config.app.secretSession,
  resave: true,
  saveUninitialized: true
});
let game = new Game();

app.set("view engine", "twig");
app.set("views", "./src/views");

// MIDDLEWARES
// attachement de la session
app.use(session);
// serveur de fichier statiques
app.use(
  config.ressources.staticFilesRootPath,
  express.static(__dirname + "/.." + "/public")
);

// WEBSOCKET
// partage de la session avec socketio
let serverSocket = io.of("/cluedo");
serverSocket.use(
  sharedSession(session, {
    autoSave: true
  })
);

// lorsqu'un client se connecte à la socket
serverSocket.on("connection", clientSocket => {
  // si c'est un nouveau client
  clientSocket.handshake.session.userData = {
    uid: uuid(),
    name: null
  };
  // envoi des infos au joueur
  clientSocket.emit("get-new-uid", clientSocket.handshake.session.userData.uid);

  // si le client demande une reconnexion
  clientSocket.on("resume-connection", uid => {
    clientSocket.handshake.session.userData = {
      uid: uid,
      name: null
    };
  });

  // écoute des évènements
  clientSocket.on("join-game", () => {
    const player = clientSocket.handshake.session.userData;
    try {
      game.joinGame(player);
    } catch (error) {
      console.log(error);
    }
  });

  clientSocket.on("disconnect", () => {
    const player = clientSocket.handshake.session.userData;
    try {
      game.quitGame(player);
    } catch (error) {
      console.log(error);
    }
  });
});

// ROUTES
app.get("/", (req, res) => {
  res.render("socket");
});

server.listen(config.app.port, () => {
  console.log(
    "Server running at http://" + config.app.baseUrl + ":" + config.app.port
  );
});
