var axios = require('axios');
var moment = require('moment');
var sP = require('./safetyPrediction.js');

var sP = new safetyPrediction();
radiusSafetyCheck = function(){

};

radiusSafetyCheck.prototype.getInfo = function(lat, long)  {

    var dataPromise = this.lookUpCrimeOverPeriod(lat, long);
    dataPromise.then(function(response){
      var crimeScores = {
        ARSON: '50',
        ASSAULT: '60',
        BATTERY: '30',
        BURGLARY: '25',
        CONCEALED_CARRY_LICENSE_VIOLATION: '15',
        CRIM_SEXUAL_ASSAULT: '70',
        CRIMINAL_ABORTION: '70',
        CRIMINAL_DAMAGE: '25',
        CRIMINAL_TRESPASS: '10',
        DECEPTIVE_PRACTICE: '5',
        GAMBLING: '15',
        HOMICIDE: '100',
        HUMAN_TRAFFICKING: '70',
        INTERFERENCE_WITH_PUBLIC_OFFICER: '5',
        INTIMIDATION: '15',
        KIDNAPPING: '75',
        LIQUOR_LAW_VIOLATION: '10',
        MOTOR_VEHICLE_THEFT: '35',
        NARCOTICS: '20',
        OBSCENITY: '10',
        OFFENSE_INVOLVING_CHILDREN: '70',
        OTHER_NARCOTIC_VIOLATION: '40',
        OTHER_OFFENSE: '25',
        PROSTITUTION: '25',
        PUBLIC_INDECENCY: '30',
        PUBLIC_PEACE_VIOLATION: '50',
        RITUALISM: '20',
        ROBBERY: '25',
        SEX_OFFENSE: '60',
        STALKING: '50',
        THEFT: '25',
        WEAPONS_VIOLATION: '60',
        NON_CRIMINAL: '10'

      };

        var chicagoAvg = 28.47562703011064;
        var total = 0;
        for(var i = 0; i < response.data.length; i++) {
          var str = response.data[i].primary_type;
          while(str.includes(" ") || str.includes("-"))  {
            str = str.replace(" ", "_");
            str = str.replace("-", "_");
          }
          total = total + parseInt(crimeScores[str]);
        }

        var areaAvg = (total/response.data.length);
        var avgCalc = (areaAvg/chicagoAvg)*100;
        // if(isNaN(avgCalc)) {
        //   console.log("Area is not in range of any crimes.");
        // } else {
        //   console.log("Lat: " + lat + ", Long: " + long + " | Crime Severity: " + avgCalc);
        // }
        // console.log("Lat: " + lat + " | Long: " + long + " | Total Crimes: " + response.data.length + " | Total Crime Score: " + total + " | Area Average: " + avgCalc);

        latestCrime = response.data[response.data.length-1].date;
        latestCrime = moment(latestCrime).unix();

        var isoNow = moment().unix();
        // console.log(isoNow + " | " + latestCrime);

        latestCrime = moment(isoNow - latestCrime).format('hh');
        // console.log(latestCrime);

        var crimesPerDay = (response.data.length/183);
        // console.log(response.data.length + " | " + crimesPerDay);
        var crimePrediction = sP.getSafety(total, avgCalc, latestCrime, crimesPerDay);
        // console.log(crimePrediction);
    }).catch(function (error) {
      console.log(error);
    });

};

radiusSafetyCheck.prototype.lookUpCrimeOverPeriod = function(lat, long){

  var isoNow = moment().format();
  var isoOld = moment(isoNow).subtract(6, 'months').format();

  isoNow = moment(isoNow).format().split('+')[0];
  isoOld = moment(isoOld).format().split('+')[0];

  // console.log(isoOld + " | " + isoNow);

  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where":  "date between '" + isoOld + "' and '" + isoNow + "' and within_circle(location, "+lat+", "+long+", 500)"
          }
    });

};
