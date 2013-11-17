define(function (require) {

	var jQuery = require('jQuery');
	var calculateParallax = require('parallax/calculate');

	var mapStartingCenter = null;


	return function (map, from, to, scrollStart, scrollDistance, fill, scrollY, startDistance, distance) {
		if (mapStartingCenter === null) {
			mapStartingCenter = map.getCenter();
		}
		var latitudeDistance = to.latLng.lat() - from.latLng.lat();

		calculateParallax(

			[{
				name:'latitude',
				from:from.latLng.lat(), 
				to:to.latLng.lat(), 
				scrollStart:scrollStart, 
				scrollDistance:scrollDistance,
				fill:fill
			},{
				name:'longitude',
				from:from.latLng.lng(), 
				to:to.latLng.lng(), 
				scrollStart:scrollStart, 
				scrollDistance:scrollDistance,
				fill:fill
			}], 

			scrollY, 

			function (e) {
				if (e.props.latitude.value !== undefined) {
					var latitudeRelativeDistance = e.props.latitude.value - from.latLng.lat();
					var latitudePercent = latitudeRelativeDistance / latitudeDistance;

					var latDistFromCenter = mapStartingCenter.lat() - e.props.latitude.value;
					var lngDistFromCenter = mapStartingCenter.lng() - e.props.longitude.value;
					
					var lat = mapStartingCenter.lat() - (latDistFromCenter / 5);
					var lng = mapStartingCenter.lng() - (lngDistFromCenter / 5);

					var center = new google.maps.LatLng(lat, lng);
					map.setCenter(center);



				}

			}

		);
	}

});