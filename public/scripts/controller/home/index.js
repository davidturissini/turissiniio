define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips';

		
		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.posts = JSON.parse(e);

			data.title = 'Home';

			return data;
		});



		return promise;

	}

});