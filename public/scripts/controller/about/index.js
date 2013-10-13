define(function (require) {


	var resourceFetch = require('resource/fetch');


	return function (route, resourceConfig) {
		var resourcePath = '/';

		
		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.about = JSON.parse(e);

			data.title = 'About';

			return data;
		});



		return promise;

	}

});