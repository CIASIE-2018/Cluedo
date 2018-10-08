let app = require('express')()

app.set('view engine', 'twig')

app.get('/', (request, response) => {
    response.render('index', {test: 'Salut'})
})

app.listen(8080)