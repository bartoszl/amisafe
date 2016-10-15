var axios = require('axios');
var dateFormat = require('dateformat');

//defining const

const RADIUS = '100';
const LATITUDE = '41.69';
const LONGITUDE = '-87.63';

//defining variable

var timestampNow = Date.now();
var timestampThreeMonthsAgo = timestampNow - 7776000000;

var isoNow = dateFormat(timestampNow, "isoDateTime").split('T')[0] +'T00:00:00.000';
var isoThreeMonthsAgo = dateFormat(timestampThreeMonthsAgo, "isoDateTime").split('T')[0] +'T00:00:00.000';

var result =[]

//Beginning of the code

axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?', {
	params :
		{
			 
			"$where": "date between '"+isoNow+"' and '"+isoThreeMonthsAgo+"' and within_circle(location, "+LATITUDE+", "+LONGITUDE+", "+RADIUS+")"
		}
})
  .then(function (response) {

  	for(var i=0;i<response.data.length;i++){
	  	if((response.data[i].primary_type != 'NON-CRIMINAL') && (response.data[i].primary_type != 'GAMBLING') && (response.data[i].primary_type != 'DECEPTIVE PRACTICE') && (response.data[i].primary_type != 'CRIMINAL TRESPASS')){
	  		
	  		result.push(response.data[i]);
	  	}
	  }
	  
		console.log(response.data.length);
    
  	console.log(result.length);
  })
  .catch(function (error) {
    console.log(error);
  });
