define(function (require) {

	var jQuery = require('jQuery');
	var calculateParallax = require('parallax/calculate');

	var odomenterEl = jQuery('#odometer-value');

	return function (map, from, to, scrollStart, scrollDistance, fill, scrollY, startDistance, distance) {

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
					var odometerValue;

					var center = new google.maps.LatLng(e.props.latitude.value, e.props.longitude.value);
					map.setCenter(center);

					odometerValue = Math.round(startDistance + distance * latitudePercent);
					odomenterEl.text(odometerValue);

				}

			}

		);
	}

});