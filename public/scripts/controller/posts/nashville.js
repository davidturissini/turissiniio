define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips/nashville-tennessee-north-carolina-fall-road-trip';

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

			// nashville
			trip.locations[0].initialPhoto = trip.locations[0].photos.splice(18, 1)[0];

			// lynchburg
			trip.locations[1].initialPhoto = trip.locations[1].photos.splice(9, 1)[0];

			//lookout mountain
			trip.locations[2].initialPhoto = trip.locations[2].photos.splice(0, 1)[0];

			//smokey mountains
			trip.locations[3].initialPhoto = trip.locations[3].photos.splice(6, 1)[0];

			//pisgah inn
			trip.locations[4].initialPhoto = trip.locations[4].photos.splice(2, 1)[0];

			//grandfather mountain
			trip.locations[5].initialPhoto = trip.locations[5].photos.splice(0, 1)[0];

			//blue ridge parkway
			trip.locations[6].initialPhoto = trip.locations[6].photos.splice(11, 1)[0];

			//asheville
			trip.locations[7].initialPhoto = trip.locations[7].photos.splice(0, 1)[0];

			//grand old opry
			trip.locations[8].initialPhoto = trip.locations[8].photos.splice(0, 1)[0];

			trip.locations.forEach(function (location, index) {
				if (index < 3 || index === trip.locations.length - 1) {
					location.position = 'right';
				} else {
					location.position = 'left';
				}
			});

			data.title = 'Trip report for Nashville, Tennessee and North Carolina Autumn';


			return data;
			
		});



		return promise;

	}

});