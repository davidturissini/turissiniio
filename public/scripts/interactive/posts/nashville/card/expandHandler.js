define(function (require) {

	var jQuery = require('jQuery');
	var getCardById = require('interactive/posts/nashville/card/getCardById');
	var responsiveDimensions = require('element/responsive/windowDimensions');

	return function (cards, evt) {
		var imageEl = jQuery(evt.target);
		var blogSection = imageEl.parents('.blog-section');
		var id = blogSection.attr('id');
		var card = getCardById(id, cards);
		var galleria = jQuery('.images', blogSection).data('galleria');
		var ratio = imageEl.width() / imageEl.height();

		window.requestAnimationFrame(function () {
			var height = responsiveDimensions.windowHeight * 0.8;
			var width = height * ratio;

			if (!card.isExpanded()) {
				card.expand(width, height);
			}
		});

	}


});