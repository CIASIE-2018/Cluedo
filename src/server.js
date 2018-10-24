// Modules
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const expressSession = require("express-session");
const sharedSession = require("express-socket.io-session");
const uuid = require("uuid/v4");

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

app.set("view engine", "twig");
app.set("views", "./src/views");

// MIDDLEWARES
// attachement de la session
app.use(session);
// partage de la session avec socketio
io.use(sharedSession(session));
// serveur de fichier statiques
app.use(
  config.ressources.staticFilesRootPath,
  express.static(__dirname + "/public")
);

// WEBSOCKET
// lorsqu'un client se connecte à la socket
io.on("connection", clientSocket => {
  // on stocke les infos du joueur
  clientSocket.handshake.session.userData = {
    uid: uuid(),
    name: null
  };

  // écoute des évènements
  clientSocket.on("join-game", () => {
    const user = clientSocket.handshake.session.userData;
    console.log(user.uid + " - " + user.name);
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
