var axios = require('axios');

chicagoFlowController = function(){

};

/*
  look up all crimes over a specific timespan
*/

chicagoFlowController.prototype.lookUpAllOverPeriod = function(startDate, stopDate, limit){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
            "domestic": false,
            "$limit" : limit
            // "arrest": true,

          }
    });

};

/*
  look up a specific crimes over a specific timespan
*/

chicagoFlowController.prototype.lookUpCrimeOverPeriod = function(type, startDate, stopDate, limit){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
            "domestic": false,
            "$limit" : limit
            // "arrest": true,
            "primary_type": type
          }
    });

};

/*
  look up crime type by location (useful for getting the number of crimes)
*/

chicagoFlowController.prototype.lookUpZone = function(type, lat, long, rad){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between '2016-01-01T00:00:00' and '2016-01-30T23:59:59' and within_circle(location, " + lat + ", " + long + ", " + rad + ")",
            "domestic": false,
            // "arrest": true,
            "primary_type": type
          }
    });
};

/*
  look up all crimes in a location
*/

chicagoFlowController.prototype.lookUpCrimeInZone = function(lat, long, rad){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between '2016-01-01T00:00:00' and '2016-01-30T23:59:59' and within_circle(location, " + lat + ", " + long + ", " + rad + ")",
            "domestic": false,
            // "arrest": true,

          }
    });
};

/*
  displays crimes with attributes of our chosing over a timespan
  crime types are defined in a measurementTypes array
*/

chicagoFlowController.prototype.getInfo = function(startDate, stopDate, measurementTypes, limit){

    var dataPromise = this.lookUpAllOverPeriod(startDate, stopDate, limit);
    dataPromise.then(function(result){
      result.data.map(function(entry){

        console.log("\nDescription: " + entry[measurementTypes[0]], "\nArrested: " + entry[measurementTypes[1]], "\nLocation: " + entry[measurementTypes[2]]);
      });
    }).catch(function (error) {
      console.log(error);
    });

};

/*
  displays all crimes of a specific type over a timespan
*/

chicagoFlowController.prototype.getSpecificInfo = function(type, startDate, stopDate, limit){

    var dataPromise = this.lookUpAllOverPeriod(type, startDate, stopDate, limit);
    dataPromise.then(function(result){
      result.data.map(function(entry){

        console.log("\nDescription: " + entry[type]);
      });
    }).catch(function (error) {
      console.log(error);
    });

};

/*
  displays the amount of a specific crime type in a given location and radius
*/

chicagoFlowController.prototype.getCrimeCount = function(type, lat, long, rad){
  var dataPromise = this.lookUpZone(type, lat, long, rad);
  dataPromise.then(function(result){
      console.log(type + " count: " + result.data.length);
  }).catch(function (error) {
    console.log(error);
  });
};

/*
  displays all crimes in a given location and radius
*/

chicagoFlowController.prototype.getCrimeByLocation = function(lat, long, rad){
  var dataPromise = this.lookUpCrimeInZone(lat, long, rad);
  dataPromise.then(function(result){
    console.log("Crime Variety Count: " + result.data.length);
    result.data.map(function(entry){
      console.log("Crime Variety: " + entry.description);
    });
  }).catch(function (error) {
    console.log(error);
  });
};
