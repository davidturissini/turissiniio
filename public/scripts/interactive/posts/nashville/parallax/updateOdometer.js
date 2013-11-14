define(function (require) {

	var jQuery = require('jQuery');
	var calculateParallax = require('parallax/calculate');

	var odomenterEl = jQuery('#odometer-value');
	var stateEl = jQuery('#state');
	var timezoneEl = jQuery('#timezone');
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
					var odometerValue;

					var latDistFromCenter = mapStartingCenter.lat() - e.props.latitude.value;
					var lngDistFromCenter = mapStartingCenter.lng() - e.props.longitude.value;

					odometerValue = Math.round(startDistance + distance * latitudePercent);
					odomenterEl.text(odometerValue);

					if (odometerValue > 149 && odometerValue < 794) {
						timezoneEl.text('Eastern Time Zone');
					} else {
						timezoneEl.text('Central Time Zone');
					}

					if (odometerValue > 155 && odometerValue < 180) {
						stateEl.text('Georgia');
					} else if (odometerValue > 346 && odometerValue < 661) {
						stateEl.text('North Carolina');
					} else {
						stateEl.text('Tennessee');
					}


				}

			}

		);
	};

});