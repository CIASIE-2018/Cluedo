let Cluedo = require("./controller/CluedoController");
let Grid = require("./controller/GridController");
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
  var grid = new Grid().grid;
  Cluedo.start();
  response.render("cluedo", { grid });
});

app.listen(config.app.port);
