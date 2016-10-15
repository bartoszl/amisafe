var moment = require('moment');

safetyPrediction = function() {

};

safetyPrediction.prototype.getSafety = function(crimeScore, crimeAvg, latestCrimeDate, crimesPerDay) {

	var coefficient = 1/crimesPerDay;

	predictionRateCrime = (1 - Math.pow(1-coefficient ,latestCrime/24)) * 100;
	worstCaseScenario = (1 - Math.pow(1-coefficient ,(latestCrime+48)/24)) * 100;

	console.log(crimesPerDay + " crimes per day");
	console.log(latestCrime + " hours ago");
	console.log(predictionRateCrime)
	console.log(worstCaseScenario)

	// if(result.length<=5){
	// 		console.log('The area is safe')
	//
	// } else if((result.length>5) && (result.length<=15)){
	// 		console.log('The area is not safe')
	//
	// } else if((result.length>15) && (result.length<=25)){
	// 		console.log('The area is dangerous')
	//
	// } else{
	// 		console.log('The area is very dangerous')
	//
	// }
}
