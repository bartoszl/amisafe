var helper = require('./chicagoFlowController.js');

var dataHelper = new chicagoFlowController();
// dataHelper.getInfo("NARCOTICS", "description");
dataHelper.getInfo("HOMICIDE", "description", "arrest");
