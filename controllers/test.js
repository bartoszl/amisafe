var helper = require('./chicagoFlowController.js');



var dataHelper = new chicagoFlowController();
var startDate = '2016-01-01T00:00:00';
var stopDate = '2016-06-30T23:59:59';
var limit = 50;
// dataHelper.getInfo("NARCOTICS", "description");

dataHelper.getCrimeCount("THEFT", 41.86, -87.66, 250);
dataHelper.getCrimeByLocation(41.86, -87.66, 250);

var measurementTypes = ["description", "arrest", "location"];
console.log("/****************Crimes Committed in Chicago from " + startDate + " till " + stopDate + "****************/");
dataHelper.getInfo(startDate, stopDate, measurementTypes, limit);
dataHelper.getSpecificInfo(type, startDate, stopDate, measurementTypes, limit);
