var everytrail = require('everytrail');
var everytrailApiKey = 'b4698addce8098c96300da620996c899';
var everytrailSecret = '03ff2a1c38a05a65';


module.exports = function () {
	everytrail.configure({
		protocol:'http',
		domain:'www.everytrail.bytemagik.com',
		key:everytrailApiKey,
		secret:everytrailSecret
	});

	return everytrail;

};