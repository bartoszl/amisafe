var axios = require('axios');

axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json', {
    params: {
      //"$where": "within_circle(location, 41.86, -87.66, 50)",
      "$where": "date between '2016-04-01T00:00:00' and '2016-10-01T00:00:00'"
      // "community_area": 1
      // "$where":  "date between '2016-04-01T00:00:00' and '2016-10-01T00:00:00' and within_circle(location, 41.86, -87.66, 250)"
      // "domestic": false
    }
  })
  .then(function (response) {

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

    var output = [];
    var output2 = [];
    for(var i = 1; i < 78; i++) {
      output[i] = 0;
      output2[i] = 0;
    }
    console.log(response.data.length);
    for(var i = 0; i < response.data.length; i++) {
      var str = response.data[i].primary_type;
      while(str.includes(" ") || str.includes("-"))  {
        str = str.replace(" ", "_");
        str = str.replace("-", "_");
      }
      // console.log(response.data[i].community_area + " | " + str + " | " + crimeScores[str]);
      output[response.data[i].community_area]++;
      output[response.data[i].community_area] = output[response.data[i].community_area] + parseInt(crimeScores[str]);
      // output[response.data[i].community_area]++;
    }

    for(var i = 1; i < 78; i++) {
      console.log("Community Area: " + i + " | Number of Crimes" + output2[i] + " | Crime Score: " + output[i]);
    }

    console.log("Total Crimes: " + response.data.length);

    var tot = 0;
    for(var i = 1; i < 78; i++) {
      tot = tot + output[i];
    }
    var chicagoScore = tot/response.data.length;
    console.log("Total Crime Score: " + tot + " | Chicago Crime Severity Avg.:" + chicagoScore);
    // console.log(output);
    // console.log("Community Area: " + response.data[0].community_area + " | Number of Crimes: " + response.data.length);
  })
  .catch(function (error) {
    // console.log("Error");
    console.log(error);
  });
