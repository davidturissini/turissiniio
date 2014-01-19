

	var resourceFetch = require('resource/fetch');

	module.exports = function () {

		return resourceFetch('/kml/nashvilletolynchburg.kml')

			.then(function (e) {
				var xml = jQuery(e);
				var coordinateElems = jQuery('coordinates', xml);
				var coords = [];

				coordinateElems.each(function (index, elem) {
					var tripLeg = [];
					
					var innerCoords = elem.innerHTML.split('\n');

					innerCoords.forEach(function (innerCoord) {
						var split = innerCoord.split(',');
						var latitude = split[1];
						var longitude = split[0];

						if (!latitude || !longitude) {
							return;
						}

						var latLng = new google.maps.LatLng(latitude, longitude);

						tripLeg.push(latLng);

					});

					coords.push(tripLeg);

				});


				return coords;

			});

	};