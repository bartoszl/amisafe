var axios = require('axios');

chicagoFlowController = function(){
  // this.getDescription("NARCOTICS");
  // this.getDistrict("NARCOTICS");
};


chicagoFlowController.prototype.lookUpData = function(type){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between '2016-01-01T00:00:00' and '2016-06-30T23:59:59'",
            "domestic": false,
            // "arrest": true,
            "primary_type": type
          }
    });

};

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


chicagoFlowController.prototype.getInfo = function(type, description, arrested, location){

    var dataPromise = this.lookUpData(type);
    dataPromise.then(function(result){
      result.data.map(function(entry){
        console.log("Description: " + entry[description], "Arrested: " + entry[arrested], "Location: " + entry[location]);
      });
    }).catch(function (error) {
      console.log(error);
    });

};

chicagoFlowController.prototype.getCrimeCount = function(type, lat, long, rad){
  var dataPromise = this.lookUpZone(type, lat, long, rad);
  dataPromise.then(function(result){
      console.log("Crime count: " + result.data.length);
  }).catch(function (error) {
    console.log(error);
  });
};
