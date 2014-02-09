

	var jQuery = require('jQuery');
	var dimensions = {}
	
	function refresh() {

		dimensions.windowHeight = window.innerHeight;
		dimensions.windowWidth = window.innerWidth;

	};

	refresh();

	jQuery(window).on('resize', refresh.bind(undefined));

	module.exports = dimensions;
