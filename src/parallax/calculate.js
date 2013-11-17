define(function (require) {

	// time, beginning, change, duration
	Math.linearTween = function (t, b, c, d) {
		return c*t/d + b;
	};

	return function calculateParallax (props, currentScrollY, renderMethod) {
		var values = [];
		var renderProps = {};

		props.forEach(function (prop) {
			var distancePastStart;
			var value;

			if (currentScrollY < prop.scrollStart) {
				if (prop.fill === 'both' || prop.fill === 'backwards') {
					value = prop.from;
				}
			} else if (currentScrollY > prop.scrollStart + prop.scrollDistance) {
				if (prop.fill === 'both' || prop.fill === 'forwards') {
					value = prop.to;
				}
			} else {
				distancePastStart = currentScrollY - prop.scrollStart;
				value = Math.linearTween(distancePastStart / prop.scrollDistance, prop.from, prop.to - prop.from, 1);
			}


			renderProps[prop.name] = {
				value:value
			};

		});

		renderMethod({props:renderProps});

	};
});