define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips/nashville';

		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);

		var tripDistanceSegments = [73.2, 91, 169.7, 96.6, 92.1, 82.5, 294];

		var tripDistance = 0;

		tripDistanceSegments.forEach(function (distance) {
			tripDistance += distance;
		});


		promise = promise.then(function (e) {
			var trip = JSON.parse(e);
			var data = {
				trip: trip,
				tripDistance: tripDistance,
				numLocations: trip.locations.length,
				numStates: 3,
				tripDistanceSegments: tripDistanceSegments
			};

			data.title = data.trip.title;


			return data;
			
		});



		return promise;

	}

});