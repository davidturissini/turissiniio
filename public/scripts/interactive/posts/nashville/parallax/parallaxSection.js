define(function (require) {

	var _ = require('underscore');
	var calculateParallax = require('parallax/calculate');

	var renderOpacity = function (jqEl, marker, map, e) {
		var opacity;
		var styles = {
			display:'block'
		};

		if (e.props.opacity.value !== undefined) {
			styles.opacity = e.props.opacity.value;

			if (styles.opacity === 0) {
				styles.display = 'none';
				marker.setMap(null);
			} else if (marker.getMap() === null) {
				marker.setMap(map);
			}

			jqEl.css(styles);
		}
	};

	return function parallaxSection (jqEl, jqElOffset, scrollY, windowHeight, marker, map) {
		var fadeInStart = jqElOffset.top;
		var fadeDistance = windowHeight;
		var contentFadeDistance = fadeDistance * 1.9;
		var boundRenderOpacity = renderOpacity.bind(undefined, jqEl, marker, map);

		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:fadeInStart + fadeDistance * 1, 
				scrollDistance:fadeDistance,
				fill:'both'
			}], 

			scrollY, 

			boundRenderOpacity

		);

		calculateParallax(

			[{
				name:'opacity',
				from:1, 
				to:0, 
				scrollStart:fadeInStart + (fadeDistance * 2.5), 
				scrollDistance:contentFadeDistance,
				fill:'forwards'
			}], 

			scrollY, 

			boundRenderOpacity

		);
		
	}

});