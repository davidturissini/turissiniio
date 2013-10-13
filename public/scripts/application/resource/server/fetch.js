define(function (require) {
	
	var fsfetch = require('resource/fsfetch');
	var urlfetch = require('resource/urlfetch');

	return function resourceFetch (path) {
		
		if (/http\:\/\//.test(path)) {
			return urlfetch(path);
		} else {

			return fsfetch(path);
		}
	};


});