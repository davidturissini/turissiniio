
	
	var fsfetch = require('resource/fsfetch');
	var urlfetch = require('resource/urlfetch');

	module.exports = function resourceFetch (path) {
		
		if (/http\:\/\//.test(path)) {
			return urlfetch(path);
		} else {

			return fsfetch(path);
		}
	};