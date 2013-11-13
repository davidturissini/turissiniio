define(function (require) {

	var jQuery = require('jQuery');
	var _ = require('underscore');
	var calculateParallax = require('parallax/calculate');


	return function parallaxSection (jqEl, jqElOffset, scrollY, windowHeight, marker, map) {
		var fadeInStart = jqElOffset.top;
		var fadeDistance = windowHeight;
		var contentFadeDistance = fadeDistance;

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
					
					if (jqEl.hasClass('active')) {
						jqEl.one('transitionend', function () {
							jqEl.css({
								display:'none'
							})
						});

						jqEl.removeClass('active');
					}

				} else {

					if (!jqEl.hasClass('active')) {
						jqEl.css({
							display:'block'
						});
						jqEl.get(0).offsetHeight;

						jqEl.addClass('active');
					}
				}
			}

		);
		
	}

});