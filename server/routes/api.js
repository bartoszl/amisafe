var express = require("express");
var Router = express.Router();
var axios = require('axios');

Router.get('/', function(req, res, next) {
  res.send("hello api");
});

Router.get('/points', function(req, res, next){
  const startDate = '2016-01-01T00:00:00';
  const stopDate = '2016-06-30T23:59:59';
  const limit = 50;

  axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json', {
      params: {
        "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
        "domestic": false,
        "$limit" : limit
      }
    }).then(function(results){
      console.log(results);
      res.send(results);
    }).catch(function(err){
      res.send(err);
    });
});

module.exports = Router;
