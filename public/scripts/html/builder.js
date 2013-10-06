define(function (require) {

	var Q = require('Q');
	var resourceFetch = require('resource/fetch');
	var Mustache = require('mustache');


	return function (route) {

		var viewPath = route.template || route.name.split(':').join('/') + '/index.html';
		var promises = [];

		if (viewPath[0] !== '.') {
			viewPath = '/html/views/' + viewPath;
		}
		

		return resourceFetch(viewPath);
		

	}


});
