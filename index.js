var express = require('express');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

var api = require('./server/routes/api');
app.use('/api', api);

app.use('/', function(req, res, next){
  res.sendFile('./public/index.html');
});

var port = process.env.PORT || 8081;

app.listen(port, function() {
  console.log("Application listening on port 3000");
});
