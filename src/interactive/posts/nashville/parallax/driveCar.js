var calculateParallax = require('./../../../../parallax/calculate');

module.exports = function (carSegments, carMarker, scrollStart, scrollDistance, fill, scrollY) {

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
			var length = carSegments.length;
			var min = (length * 0.05);
			var max = (length * 0.95);

			if (e.props.car.value !== undefined) {
				index = Math.round(e.props.car.value);
				carLatLng = carSegments[index];

				if (carMarker.getElement()) {
					carMarker.setPosition(carLatLng);
				}


				if (e.props.car.value < min || e.props.car.value > max) {
					carMarker.parked();
				}

				carMarker.driving();
			}

		}

	);
}