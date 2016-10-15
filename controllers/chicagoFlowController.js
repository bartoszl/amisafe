var axios = require('axios');


// var type = "NARCOTICS";

// axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
//     params: {
//       "$where": "date between '2016-01-01T00:00:00' and '2016-06-30T23:59:59'",
//       "domestic": false,
//       "primary_type": type
//     }
//   }).then(function(result){
//     result.data.map(function(entry){
//       console.log(entry.description);
//     });
//   }).catch(function (error) {
//   console.log(error);
//   });


chicagoFlowController = function(){
  // this.getDescription("NARCOTICS");
  // this.getDistrict("NARCOTICS");
};


chicagoFlowController.prototype.getData = function(type){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where": "date between '2016-01-01T00:00:00' and '2016-06-30T23:59:59'",
            "domestic": false,
            "arrest": true,
            "primary_type": type
          }
    });

};


chicagoFlowController.prototype.getInfo = function(type, printType){

    var dataPromise = this.getData(type);
    dataPromise.then(function(result){
      result.data.map(function(entry){
        console.log(entry[printType]);
      });
    }).catch(function (error) {
      console.log(error);
    });

};
