var express = require('express');

var bodyParser = require('body-parser');  
var methodOverride = require('method-override');

var app = express();

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

var api = require('./server/routes/api');
app.use('/api', api);

app.use('/', function(req, res, next){
  res.sendFile('./public/index.html');
});


app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});
app.get('/amisafe/:case', function(req, res) {
    var location = [];
    location.push(['41.86','-87.66']);
    res.render('page.ejs', {case: req.params.nombre, location: location});
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Application listening on port 3000");
});
