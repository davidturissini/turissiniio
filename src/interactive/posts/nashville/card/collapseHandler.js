define(function (require) {

	var jQuery = require('jQuery');
	var getCardById = require('interactive/posts/nashville/card/getCardById');
	var responsiveDimensions = require('element/responsive/windowDimensions');
	

	return function (cards, evt) {
		var blogSection = jQuery(evt.target).parents('.blog-section');
		var id = blogSection.attr('id');
		var card = getCardById(id, cards);
		var height = card.minimizedImageHeight();
		var width = responsiveDimensions.windowWidth * 0.4;

		window.requestAnimationFrame(function () {
			if (card.isExpanded()) {
				card.collapse()
			}

		});
		
	}


});