define(function (require) {

	var Galleria = require('Galleria');
	var jQuery = require('jQuery');
	var dimensions = require('element/responsive/windowDimensions');

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
				imageCrop:true,
				thumbnailCrop:false,
				initialTransition:false,
				showCounter:false
			};

			var numLoaded = 0;
			imagesEl.each(function (index, el) {

				var img = document.createElement('img');

				img.addEventListener('load', function () {
					numLoaded += 1;
					options.height = jQuery(el).height();
					options.width = jQuery(el).width();

					if (options.height > dimensions.windowHeight * 0.8) {
						options.height = dimensions.windowHeight * 0.8;
					}

					Galleria.run(jQuery(el), options);
				});

				img.src = jQuery('img', el).get(0).getAttribute('src');

			});


		});

	};

});