// connexion à la websocket du serveur
var socket = io.connect("http://localhost:8080/cluedo");
// récupère l'uid du joueur si il à deja un uid
var playerData = localStorage.getItem("uid");

// WEBSOCKET
socket.on("connect", data => {
  // si le joueur a déja un uid, on demande au serveur de récupérer son profil
  if (playerData) {
    socket.emit("resume-connection", playerData);
    // sinon on demande au seveur de generer un nouveau joueur
  } else {
    socket.on("get-new-uid", uid => {
      localStorage.setItem("uid", uid);
    });
  }
  // On demande ensuite à rejoindre une partie
  socket.emit("join-game");
});
