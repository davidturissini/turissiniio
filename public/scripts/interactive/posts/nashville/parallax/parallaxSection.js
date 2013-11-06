define(function (require) {

	var jQuery = require('jQuery');
	var _ = require('underscore');
	var calculateParallax = require('parallax/calculate');

	var renderOpacity = function (jqEl, map, e) {
		var opacity;
		var styles = {
			visibility:'visible'
		};

		if (e.props.opacity.value !== undefined) {
			styles.opacity = e.props.opacity.value;

			if (styles.opacity === 0) {
				styles.visibility = 'hidden';
			}

			jqEl.css(styles);

		}
	};

	return function parallaxSection (jqEl, jqElOffset, scrollY, windowHeight, marker, map) {
		var fadeInStart = jqElOffset.top;
		var fadeDistance = windowHeight / 2;
		var contentFadeDistance = fadeDistance;
		var boundRenderOpacity = renderOpacity.bind(undefined, jqEl, map);

		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:fadeInStart + fadeDistance, 
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
				scrollStart:fadeInStart + (fadeDistance * 2), 
				scrollDistance:contentFadeDistance,
				fill:'forwards'
			}], 

			scrollY, 

			boundRenderOpacity

		);
		
	}

});