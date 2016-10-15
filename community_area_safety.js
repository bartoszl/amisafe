var axios = require('axios');
var moment = require('moment');

//defining variable

var timestampNow = moment().format();
var timestampPrevious = moment().subtract(14, 'days').format();
timestampNow =  moment().subtract(7, 'days').format();

var isoNow = moment(timestampNow).format().split('+')[0];
var isoPrevious = moment(timestampPrevious).format().split('+')[0];

var assault =[];
var narcotics =[];
var week = [];

var latestCrime = 0;
console.log(isoNow)
console.log(isoPrevious)

//Beginning of the code


axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?', {
	params :
		{			 
			"$where": "date between '"+isoPrevious+"' and '"+isoNow+"'"
		}
})
  .then(function (response) {
  	console.log(response.data.length)

  	for(var i=0;i<response.data.length;i++){
  		
  		if(response.data[i].primary_type == 'NARCOTICS'){
  			narcotics.push(response.data[i])
  		}

  		if(response.data[i].primary_type == 'ASSAULT'){
  			assault.push(response.data[i])
  		}
  	}



  	console.log(assault.length)
  	console.log(narcotics.length)
  })
  .catch(function (error) {
    console.log(error);
  });
