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

Router.post('/address', function(req, res, next){
  lookUpAddress = function(address){
    return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        "address": address
      }
    });
  };

    var dataPromise = this.lookUpAddress(req.body.address);
    dataPromise.then(function(result){
       console.log(result.data.results[0].geometry.location);
    }).catch(function (error) {
      console.log(error);
    });
  };
})

module.exports = Router;
