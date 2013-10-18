define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips/nashville';

		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);


		promise = promise.then(function (e) {
			var data = {
				trip: JSON.parse(e)
			};

			data.title = data.trip.title;


			return data;
			
		});



		return promise;

	}

});