define(function (require) {

	var Galleria = require('Galleria');
	var jQuery = require('jQuery');
	var loadedThemes = {};


	return function (sectionEls, themeUrl) {
		if (loadedThemes[themeUrl] !== true) {
			Galleria.loadTheme(themeUrl);
			loadedThemes[themeUrl] = true;
		}

		sectionEls.each(function (idx, el) {
			var imageEl = jQuery('img', el);
			var height = imageEl.height();
			var ratio = imageEl.width() / height;
			var imagesEl = jQuery('.images', el);

			if (imagesEl.length === 0) {
				return;
			}

			var options = {
				imagePosition:'center',
				showImagenav:false,
				imageCrop:false,
				initialTransition:false,
				showCounter:false,
				thumbnails:false
			};

			if (height !== 0 || height !== null) {
				options.height = height;
				Galleria.run(imagesEl, options);
			}
		});

	};

});