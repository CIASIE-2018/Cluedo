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


let Game = {
    GameStatus: "load", //Status de chargement des parametres de jeu
    PlayerCard: []      //liste des Cartes de chaque joueurs
};



//Nombre de Cartes en fonction du nombre de joueurs
// NB de carte total 21 - 3 = 18
let NumberOfCardPlayers = [[18], [9, 9], [6, 6, 6], [5, 5, 4, 4], [4, 4, 4, 3, 3], [3, 3, 3, 3, 3, 3]];
// Placement du joueur en debut de partie
let PlaceStart = [[5, 0], [18, 0], [24, 9], [24, 14], [7, 23], [0, 16]];

app.get("/cluedo", (request, response) => {
    if (PlayerMax === 1) {
        throw 'Nombre de joueurs insuffisant';
    } else {

        let MyUuiD = request.session.player.uid;
        let IdNumOfPlayer = TableOFPlayer.indexOf(MyUuiD);

        //Pour éviter de recharger les parametres.
        if (Game.GameStatus === "load") {
            for (var i = 0; i < PlayerMax; i++) {
                Game.PlayerCard[i] = pack.getManyCards(NumberOfCardPlayers[PlayerMax - 1][i]);

                //ID Joueurs
                Cluedo.start(board, i + 1, PlaceStart[i]);
            }
            PlayTurnOfPlayer.TurnIdPlayer = TableOFPlayer[0]; //Premier joueur qui va jouer
            Game.GameStatus = "start";
        }

        let cardPack = Game.PlayerCard[IdNumOfPlayer];

        response.render("cluedo", { board, ListOfAllCards, cardPack, MyUuiD });
    }
});





//Variables socket

//Cartes qui seront transmises à un autre joueurs.
let CardFound = null;               // SOCKET HYPOTHESE
//Sauvergade id joueur qui fait une demande
let IdPlayerComeBack = null;        // SOCKET HYPOTHESE
//Reçu de la carte choisi par la liste du joueur
let CardFromPlayer = null;          // SOCKET HYPOTHESE

// SOCKET
serverSocket.on("connection", clientSocket => {
    // Lorsque un client se connecte
    //console.log("Client connected");



    // SOCKET DES
    clientSocket.on("rollTheDice", msg => {
        if (msg === PlayTurnOfPlayer.TurnIdPlayer) {
            if (PlayTurnOfPlayer.Action === "RollDice") {
                let firstRoll = Math.floor(Math.random() * 6) + 1;
                let SecondRoll = Math.floor(Math.random() * 6) + 1;
                RollDicePlayer = (firstRoll + SecondRoll);  //Sauvegarde du résultat pour le Move
                let sum = firstRoll + " : " + SecondRoll + " = " + RollDicePlayer;
                clientSocket.emit("sum", sum).disconnect();
                PlayTurnOfPlayer.Action = "Move";
            } else {
                error = "Tu as déjà lancé les dés.</br>Tu as obtenu " + RollDicePlayer + ".";
                clientSocket.emit('sum', error).disconnect();
            }
        } else {
            error = "Ce n'est pas à toi de jouer";
            clientSocket.emit('sum', error).disconnect();
        }
    });



    // SOCKET DEPLACEMENT
    clientSocket.on("Move", msg => {
        let IdNumOfPlayer = TableOFPlayer.indexOf(msg[0]) + 1;
        if (msg[0] == PlayTurnOfPlayer.TurnIdPlayer) {
            if (PlayTurnOfPlayer.Action === "Move") {
                if (RollDicePlayer > 0) {
                    RollDicePlayer--;
                    board.movePlayer(IdNumOfPlayer, msg[1], msg[2]);
                    if (RollDicePlayer === 0) {   //Ajouter: Ou joueur dans une piece
                        PlayTurnOfPlayer.Action = "Offer";
                    }
                    console.log(RollDicePlayer);
                }
            } else if (PlayTurnOfPlayer.Action === "RollDice") {
                console.log("Tu dois lancer les dés");
            } else {
                console.log("Tu ne peux plus te déplacer, fais une hypothèse ou une accusation");
            }
        } else {
            console.log("Ce n'est pas à toi de jouer");
        }
    });



    // SOCKET HYPOTHESE
    clientSocket.on("ItsMe", test => {
        clientSocket.emit('CardExchange', CardFound);
    });

    clientSocket.on("SeeCard", Card => {
        CardFromPlayer = Card;
        clientSocket.broadcast.emit('SearchPlayerForDisplayCard', IdPlayerComeBack );
    });

    clientSocket.on("GetCard", Card => {
        clientSocket.emit('SeeCardFromPlayer', CardFromPlayer);
        //Fin du tour
    });

    clientSocket.on("Hypothesis", msg => {
        if (msg[0] == PlayTurnOfPlayer.TurnIdPlayer) {
            if (PlayTurnOfPlayer.Action === "Offer") {
                if (Offer.Status === false) {
                    //Condition joueur est dans une pièce.

                    Offer.Status = true;
                    IdPlayerComeBack = msg[0]; //Sauvegarde de l'id du joueur qui demande des cartes

                    Offer.Log = "Hypothesis : " + msg[1].join(", ");

                    //Recherche du joueur qui possède au moins une des cartes proposé par l'hypothèse.
                    CardFound = SearchPlayerCard(msg[0], msg[1]); //msg[0]: id J, msg[1]: Hypothèse
                    clientSocket.broadcast.emit('SearchPlayerForDisplaySelectedCards', CardFound[0].split(",")[1]);
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



    // SOCKET ACCUSED
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

    // SOCKET DISCONNECT
    clientSocket.on("disconnect", () => {
        //console.log("Client disconnected");
    });
});

server.listen(config.app.port, () => {
    console.log(
        "Server running at http://" + config.app.baseUrl + ":" + config.app.port
    );
});




function SearchPlayerCard(id, Hypothesis) {
    bool = false;
    //Hypothesis = ["Colonel Moutarde", "Revolver", "Salle de bal"];
    IndexPlayer = TableOFPlayer.indexOf(id);
    CardFound = new Array();

    for (var i = 0; i < TableOFPlayer.length; i++) {  //Parcours de la liste des joueurs apres moi meme
        if (i > IndexPlayer && bool === false) {
            for (var j = 0; j < Game.PlayerCard[i].length; j++) { //Parcours de la liste des cartes du joueurs
                Hypothesis.forEach(element => {
                    if (element === Game.PlayerCard[i][j].label) {
                        CardFound.push(Game.PlayerCard[i][j].label + "," + TableOFPlayer[i] + "," + i);
                        bool = true;
                    }
                });
            }
        }
    }
    if (bool === false) {
        for (var i = 0; i < TableOFPlayer.length; i++) {  //Parcours de la liste des joueurs avant moi meme
            if (i < IndexPlayer && bool === false) {
                for (var j = 0; j < Game.PlayerCard[i].length; j++) { //Parcours de la liste des cartes du joueurs
                    Hypothesis.forEach(element => {
                        if (element === Game.PlayerCard[i][j].label) {
                            CardFound.push(Game.PlayerCard[i][j].label);
                            bool = true;
                        }
                    });
                }
            }
        }
    }
    return CardFound;
}