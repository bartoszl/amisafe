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


chicagoFlowController.prototype.getInfo = function(type, printType1, printType2){

    var dataPromise = this.lookUpData(type);
    dataPromise.then(function(result){
      result.data.map(function(entry){
        console.log("Description: " + entry[printType1], "Arrested: " + entry[printType2]);
      });
    }).catch(function (error) {
      console.log(error);
    });

};
