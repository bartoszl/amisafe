var moment = require('moment');

safetyPrediction = function() {

};

safetyPrediction.prototype.getSafety = function(crimeScore, crimeAvg) {

}

var result =[];
var latestCrime = 0;





latestCrime = response[response.data.length-1].date;
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
