let Cluedo = require('./controller/CluedoController');
let Grid = require('./controller/GridController');
let express = require('express')

let app = express()

app.set('view engine', 'twig');
app.set("views", "./src/views");

app.use('/assets', express.static('public'))

app.get('/', (request, response) => {
    response.render('index', { test: 'Salut' })
})

app.get('/cluedo', (request, response) => {
    //const grille = new Grid();

    var grille = new Array();
    for (var i = 0; i < 25; i++)
        grille[i] = new Array();
    for (var i = 0; i < 25; i++)
        for (var j = 0; j < 25; j++)
            grille[i][j] = 0;

    response.render('cluedo', { grille });
    //Cluedo.start();
})


app.listen(8080)