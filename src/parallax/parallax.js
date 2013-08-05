define(
	'parallax/Parallax', 

	[],

	function () {

		function pennerLinear (t, b, c, d) {
			return c*t/d + b;
		};


		function advanceParallax (from, to, scrollStart, scrollDistance, currentScrollY, renderMethod) {
			var value;
			var distancePastStart;

			if (currentScrollY < scrollStart) {
				value = from;
			} else if (currentScrollY > scrollStart + scrollDistance) {
				value = to;
			} else {
				distancePastStart = currentScrollY - scrollStart;
				value = pennerLinear(distancePastStart / scrollDistance, from, to - from, 1);
			}

			renderMethod(value);

		};

		return advanceParallax;

	}
);