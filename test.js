var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/amisafe/:test', function(req, res) {
    var location = [];
    location.push(['41.86','-87.66']);
    res.render('amisafe.ejs', {test: req.params.test, location: location});
});

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});


app.listen(3000);