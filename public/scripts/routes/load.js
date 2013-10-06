define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function () {
		var routesPath = '/config/routes.json';

		return resourceFetch(routesPath);
	}

});