var express = require("express");
var Router = express.Router();
var axios = require('axios');
var crimeScore = require('../../controllers/chicagoCrimeCalc.js');
var crimeInclude = require('../../controllers/chicagoFlowController.js');

var crimeController = new chicagoFlowController();

Router.get('/', function(req, res, next) {
  res.send("hello api");
});

Router.get('/points', function(req, res, next){
  const startDate = '2016-01-01T00:00:00';
  const stopDate = '2016-06-30T23:59:59';
  const limit = 10000;

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

Router.post('/address', function(req, res, next){
  const average = 28.47562703011064;
  var total = 0;
  var threshold = 5;
  var score = 0;
  location = {};
  var crimes = [];
  var type;
  var locationPromise = crimeController.lookUpAddress(req.body.address);
  locationPromise.then(function(result){
    location = result.data.results[0].geometry.location;
    var lat = location.lat;
    var lng = location.lng;
    const startDate = '2016-01-01T00:00:00';
    const stopDate = '2016-06-30T23:59:59';

    return crimeController.lookUpCrimeInZone(lat,lng, 200, startDate, stopDate);
  }).then(function(result){
    result.data.map(function(entry){
      console.log(entry.primary_type);
      type = entry.primary_type;
      crimes.push(type);
      // res.send(JSON.stringify(entry.primary_type));
    });
    var i;
    for(i = 0;i < crimes.length; i++){
      console.log("crime: " + crimes[i]);
      // crimeController.getScore(crimes[i]);
      score += crimeController.getScore(crimes[i]);
    }
    total = score/(crimes.length);
    console.log(score);
    console.log(total);
    if(total < (average - threshold)){
      res.send({"answer": 1});
    }
    else if(total > (average + threshold)){
      res.send({"answer": -1});
    }
    else{
      res.send({"answer": 0});
    }

  }).catch(function(err){
    console.log(err);
  // res.send(err);
  });

});

module.exports = Router;
