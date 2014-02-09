module.exports = function (timeline) {
	var isTicking = false;

	return function (evt) {
		var scrollY;
		
		if (isTicking === true) {
			return;
		}


		scrollY = window.scrollY;
		isTicking = true;

		window.requestAnimationFrame(function () {
			timeline.advance(scrollY);

			isTicking = false;

		});
		
	};
};