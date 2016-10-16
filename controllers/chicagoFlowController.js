var axios = require('axios');

chicagoFlowController = function(){

};


    /********************* INFO FETCH METHODS ************************/

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
            "$limit" : limit,
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

chicagoFlowController.prototype.lookUpCrimeInZone = function(lat, long, rad, startDate, stopDate){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\' and within_circle(location, " + lat + ", " + long + ", " + rad + ")",
            "domestic": false,
            // "arrest": true,

          }
    });
};

chicagoFlowController.prototype.getCrimeCountByArea = function(startDate,stopDate,area){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
            "domestic": false,
            "community_area": area

          }
    });
};


chicagoFlowController.prototype.lookUpAddress = function(address){
  return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      "address": address
    }
  });
};

    /********************* INFO Logic METHODS ************************/

/*
  displays crimes with attributes of our chosing over a timespan
  crime types are defined in a measurementTypes array
*/
chicagoFlowController.prototype.getAverage = function(startDate, stopDate){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
            "domestic": false,
          }
  });
};

chicagoFlowController.prototype.calculateAverage = function(startDate, stopDate){
  var dataPromise = this.getAverage(startDate, stopDate);
  dataPromise.then(function(result){
  var total = result.data.length;
  var average = total/77;
  console.log(average);
  })
};

chicagoFlowController.prototype.getAll = function(startDate, stopDate, limit){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between \'" +startDate+ "\' and \'"+stopDate+"\'",
            "domestic": false,
            "$limit" : limit


          }
    }).then(function(result){
      // result.data.map(function(entry){
        console.log(result);
      // });
    }).catch(function(err){
      console.log(err);
    });
};

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

    var dataPromise = this.lookUpCrimeOverPeriod(type, startDate, stopDate, limit);
    dataPromise.then(function(result){
      result.data.map(function(entry){
        console.log("\ndescriptions: " + entry.description);
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

chicagoFlowController.prototype.getLocation = function(startDate, stopDate){
  var dataPromise = this.lookUpAllOverPeriod(startDate, stopDate, 1000);
  dataPromise.then(function(result){

    result.data.map(function(entry){
      console.log("Locations: " + entry.location);
    });
  }).catch(function (error) {
    console.log(error);
  });
};

chicagoFlowController.prototype.getCoordinates = function(type, startDate, stopDate){
  var dataPromise = this.lookUpCrimeOverPeriod(type, startDate, stopDate, 100);
  dataPromise.then(function(result){
    result.data.map(function(entry){
      console.log(entry);
    });
  }).catch(function (error) {
    console.log(error);
  });
};

chicagoFlowController.prototype.getCommunityAreas = function(startDate, stopDate) {

  areaCrimes = {};
  var dataPromise = this.lookUpAllOverPeriod(startDate, stopDate, 100);
  dataPromise.then(function(result){
    result.data.map(function(entry){
      if(areaCrimes[entry.community_area]) {
        areaCrimes[entry.community_area] ++;
      } else {
        areaCrimes[entry.community_area]=1;
      }
    });
    return areaCrimes;
  }).catch(function (error) {
    console.log(error);
  });
};

chicagoFlowController.prototype.getCoordinatesFromAddress = function(address){
  return new Promise(function(resolve, reject){

    var dataPromise = this.lookUpAddress(address);
    dataPromise.then(function(result){
       console.log(result.data.results[0].geometry.location);
    }).catch(function (error) {
      console.log(error);
    });

  });

};


chicagoFlowController.prototype.setScores = function(){

  return scores;
};


chicagoFlowController.prototype.getScore = function(crimeType){
  var scores = {
    ARSON: 50,
    ASSAULT: 60,
    BATTERY: 30,
    BURGLARY: 25,
    CONCEALED_CARRY_LICENSE_VIOLATION: 15,
    CRIM_SEXUAL_ASSAULT: 70,
    CRIMINAL_ABORTION: 70,
    CRIMINAL_DAMAGE: 25,
    CRIMINAL_TRESPASS: 10,
    DECEPTIVE_PRACTICE: 5,
    GAMBLING: 15,
    HOMICIDE: 100,
    HUMAN_TRAFFICKING: 70,
    INTERFERENCE_WITH_PUBLIC_OFFICER: 5,
    INTIMIDATION: 15,
    KIDNAPPING: 75,
    LIQUOR_LAW_VIOLATION: 10,
    MOTOR_VEHICLE_THEFT: 35,
    NARCOTICS: 20,
    NON_CRIMINAL: 10,
    OBSCENITY: 10,
    OFFENSE_INVOLVING_CHILDREN: 70,
    OTHER_NARCOTIC_VIOLATION: 40,
    OTHER_OFFENSE: 25,
    PROSTITUTION: 25,
    PUBLIC_INDECENCY: 30,
    PUBLIC_PEACE_VIOLATION: 50,
    RITUALISM: 20,
    ROBBERY: 25,
    SEX_OFFENSE: 60,
    STALKING: 50,
    THEFT: 25,
    WEAPONS_VIOLATION: 60
  };

  var crimeStr = crimeType;

  if(crimeStr.includes(" ")) {
    crimeStr = crimeStr.replace(/ /g,"_");
  } else if (crimeStr.includes("-")){
    crimestr = crimeStr.replace("-", "_");
  } else if (crimeStr.includes("__")) {
    crimeStr = crimeStr.replace("__","_");
  }

  // console.log(crimeStr);
  // console.log(scores[crimeStr]);
  var value = scores[crimeStr];
  console.log("value: " + value);
  return value;
};

module.exports = chicagoFlowController;
/*
  this only works in front end, no navigator in back end
*/
// chicagoFlowController.prototype.getCurrentPosition = function(){
//   if (navigator.geolocation) {
//
//   navigator.geolocation.getCurrentPosition(function(position) {
//            var pos = {
//              lat: position.coords.latitude,
//              lng: position.coords.longitude
//            };
//          });
//        }
// console.log(pos);
// };
