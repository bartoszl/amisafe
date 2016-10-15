var axios = require('axios');
var moment = require('moment');

//defining variable

var timestampNow = moment().format();
var timestampTwoYearsAgo = moment().subtract(7, 'days').format();

var isoNow = moment(timestampNow).format().split('+')[0];
var isoTwoYearsAgo = moment(timestampTwoYearsAgo).format().split('+')[0];

var result =[]
var latestCrime = 0;
console.log(isoNow)
console.log(isoTwoYearsAgo)

//Beginning of the code


axios.get('https://data.cityofchicago.org/resource/6zsd-86xi.json?', {
	params :
		{			 
			"$where": "date between '"+isoTwoYearsAgo+"' and '"+isoNow+"'"
		}
})
  .then(function (response) {
  	console.log(response.data.length)
  })
  .catch(function (error) {
    console.log(error);
  });
