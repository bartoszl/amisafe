var axios = require('axios');
var moment = require('moment');

//defining const

const RADIUS = '250';
const LATITUDE = '41.86';
const LONGITUDE = '-87.66';

//defining variable

var timestampNow = moment().unix();
var timestampThreeMonthsAgo = moment().subtract(3, 'months').format();

var isoNow = moment().format().split('+')[0];
var isoThreeMonthsAgo = moment(timestampThreeMonthsAgo).format().split('+')[0];

var result =[]
var latestCrime = 0;

//Beginning of the code

axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?', {
	params :
		{
			 
			"$where": "date between '"+isoThreeMonthsAgo+"' and '"+isoNow+"' and within_circle(location, "+LATITUDE+", "+LONGITUDE+", "+RADIUS+")"
		}
})
  .then(function (response) {

  	for(var i=0;i<response.data.length;i++){
	  	if((response.data[i].primary_type != 'NON-CRIMINAL') && (response.data[i].primary_type != 'GAMBLING') && (response.data[i].primary_type != 'DECEPTIVE PRACTICE') && (response.data[i].primary_type != 'CRIMINAL TRESPASS')){
	  		
	  		result.push(response.data[i]);
	  	}
	  }

	  latestCrime = result[result.length-1].date;
	  console.log(latestCrime)
	  latestCrime = moment(latestCrime).unix();

	  latestCrime = moment(timestampNow - latestCrime).format('hh');

	  coefficient = result.length/90;

	  predictionRateCrime = (1 - Math.pow(1-coefficient ,latestCrime/24)) * 100;
	  worstCaseScenario = (1 - Math.pow(1-coefficient ,(latestCrime+48)/24)) * 100;

	  console.log(result.length)
	  console.log(coefficient);
	  console.log(latestCrime);
	  console.log(predictionRateCrime)
	  console.log(worstCaseScenario)

    if(result.length<=5){
 			console.log('The area is safe')

    } else if((result.length>5) && (result.length<=15)){
 			console.log('The area is not safe')

    } else if((result.length>15) && (result.length<=25)){
 			console.log('The area is dangerous')

    } else{
 			console.log('The area is very dangerous')

    }

   	console.log();
  })
  .catch(function (error) {
    console.log(error);
  });
