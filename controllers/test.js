var helper = require('./chicagoFlowController.js');



var dataHelper = new chicagoFlowController();
// dataHelper.getInfo("NARCOTICS", "description");
// dataHelper.getInfo("HOMICIDE", "description", "arrest", "location");
dataHelper.getCrimeCount("THEFT", 41.86, -87.66, 250);
dataHelper.getCrimeByLocation(41.86, -87.66, 250);
