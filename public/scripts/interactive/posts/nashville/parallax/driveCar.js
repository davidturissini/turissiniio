define(function (require) {

	var calculateParallax = require('parallax/calculate');

	return function (carSegments, carMarker, scrollStart, scrollDistance, fill, scrollY) {

		calculateParallax(

			[{
				name:'car',
				from:0, 
				to:carSegments.length - 1, 
				scrollStart:scrollStart, 
				scrollDistance:scrollDistance,
				fill:fill
			}], 

			scrollY, 

			function (e) {
				var index;
				var carLatLng;

				if (e.props.car.value !== undefined) {
					index = Math.round(e.props.car.value);
					carLatLng = carSegments[index];

					carMarker.setPosition(carLatLng);

				}

			}

		);
	}

});