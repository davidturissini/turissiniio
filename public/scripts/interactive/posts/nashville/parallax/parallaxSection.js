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
		var fadeDistance = windowHeight;
		var contentFadeDistance = fadeDistance;
		var boundRenderOpacity = renderOpacity.bind(undefined, jqEl, map);

		calculateParallax(

			[{
				name:'visible',
				from:0, 
				to:1, 
				scrollStart:fadeInStart, 
				scrollDistance:fadeDistance,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				if (e.props.visible.value === 0 || e.props.visible.value === 1) {
					jqEl.removeClass('active');
				} else {
					jqEl.addClass('active');
				}
			}

		);
		
	}

});