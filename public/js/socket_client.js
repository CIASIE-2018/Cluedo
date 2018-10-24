var socket = io.connect("http://localhost:8080/cluedo");
var playerData = localStorage.getItem("uid");
socket.on("connect", data => {
  if (playerData) {
    socket.emit("resume-connection", playerData);
  } else {
    socket.on("get-player-data", player => {
      localStorage.setItem("uid", player.uid);
    });
  }
  socket.emit("join-game");
});
