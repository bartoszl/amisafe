var moment = require('moment');

safetyPrediction = function() {

};

safetyPrediction.prototype.getSafety = function(crimeScore, crimeAvg, latestCrimeDate, crimesPerDay) {

	var coefficient = 1/crimesPerDay;

	predictionRateCrime = (1 - Math.pow(1-coefficient ,latestCrime/24)) * 100;

	// console.log(crimesPerDay + " crimes per day");
	// console.log(latestCrime + " hours ago");
	// console.log(predictionRateCrime);

	return (predictionRateCrime);


}
