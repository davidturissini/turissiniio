module.exports = function resourceFetch (path) {
	
	var fsfetch = require('./fsfetch');
	var urlfetch = require('./urlfetch');

	if (/http\:\/\//.test(path)) {
		return urlfetch(path);
	} else {

		return fsfetch(path);
	}
};