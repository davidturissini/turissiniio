define(function (require) {

	var calculateParallax = require('parallax/calculate');

	var renderOpacity = function (jqEl, e) {
		if (e.props.opacity.value !== undefined) {
			jqEl.css({
				opacity:e.props.opacity.value
			});
		}
	};

	return function parallaxSection (jqEl, jqElOffset, scrollY, windowHeight) {
		var fadeInStart = jqElOffset.top;
		var fadeDistance = windowHeight / 3;
		var fadeOutStart = fadeInStart + windowHeight * 1.9;
		var boundRenderOpacity = renderOpacity.bind(undefined, jqEl);

		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:fadeInStart, 
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
				scrollStart:fadeOutStart, 
				scrollDistance:fadeDistance,
				fill:'forwards'
			}], 

			scrollY, 

			boundRenderOpacity

		);
		
	}

});