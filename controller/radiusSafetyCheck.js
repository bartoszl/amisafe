var axios = require('axios');

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

        var chicagoAvg = 29.79443964275425;
        var total = 0;
        for(var i = 0; i < response.data.length; i++) {
          var str = response.data[i].primary_type;
          while(str.includes(" ") || str.includes("-"))  {
            str = str.replace(" ", "_");
            str = str.replace("-", "_");
          }
          total = total + parseInt(crimeScores[str]);
        }

        var areaAvg = (total/response.data.length)-(chicagoAvg/2);
        var avgCalc = (areaAvg/(chicagoAvg/2))*100;
        if(isNaN(avgCalc)) {
          // console.log("Area is not in range of any crimes.");
        } else {
          console.log("Lat: " + lat + ", Long: " + long + " | Crime Severity: " + avgCalc);
        }
        // console.log("Lat: " + lat + " | Long: " + long + " | Total Crimes: " + response.data.length + " | Total Crime Score: " + total + " | Area Average: " + avgCalc);
    }).catch(function (error) {
      console.log(error);
    });

};

radiusSafetyCheck.prototype.lookUpCrimeOverPeriod = function(lat, long){
  return axios.get("https://data.cityofchicago.org/resource/6zsd-86xi.json", {
          params: {
            "$where":  "date between '2016-04-01T00:00:00' and '2016-10-01T00:00:00' and within_circle(location, "+lat+", "+long+", 500)"
          }
    });

};
