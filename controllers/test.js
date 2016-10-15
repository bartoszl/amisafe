var helper = require('./chicagoFlowController.js');



var dataHelper = new chicagoFlowController();
var startDate = '2010-01-01T00:00:00';
var stopDate = '2016-10-14T23:59:59';
var limit = 50;
var type = "NARCOTICS";
// dataHelper.getInfo("NARCOTICS", "description");


// dataHelper.getCrimeCount("THEFT", 41.86, -87.66, 250);
// dataHelper.getCrimeByLocation(41.86, -87.66, 250);

var measurementTypes = ["description", "arrest", "location"];
console.log("/****************Crimes Committed in Chicago from " + startDate + " till " + stopDate + "****************/");
// dataHelper.getInfo(startDate, stopDate, measurementTypes, limit);
// dataHelper.getSpecificInfo(type, startDate, stopDate, limit);
// console.log("Locations: ");
// dataHelper.getLocation(startDate, stopDate);
// dataHelper.getCoordinates(type, startDate, stopDate, limit);
dataHelper.getCommunityAreas(startDate, stopDate);
