

	module.exports = function (markers, center) {
		var locationMarkers = [];

		markers.forEach(function (marker) {
			locationMarkers.push({
				marker:marker,
				latLng:marker.getPosition()
			});
		});

		locationMarkers.unshift({
			latLng:center
		});

		return locationMarkers;
	}