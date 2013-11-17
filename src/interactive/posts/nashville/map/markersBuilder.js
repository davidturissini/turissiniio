define(function (require) {

	return function (locations) {
		var markers = [];

		locations.forEach(function (locationData) {
			var latLng = new google.maps.LatLng(locationData.latitude, locationData.longitude);
			var marker = new google.maps.Marker({
				position:latLng
			});

			markers.push(marker);

		});

		return markers;
		
	}

});