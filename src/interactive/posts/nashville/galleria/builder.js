define(function (require) {

	var Galleria = require('Galleria');
	var jQuery = require('jQuery');
	var dimensions = require('element/responsive/windowDimensions');

	var loadedThemes = {};



	return function (sectionEls, options, themeUrl) {
		if (loadedThemes[themeUrl] !== true) {
			Galleria.loadTheme(themeUrl);
			loadedThemes[themeUrl] = true;
		}

		sectionEls.each(function (idx, el) {
			Galleria.run(jQuery(el), options);
		});

	};

});