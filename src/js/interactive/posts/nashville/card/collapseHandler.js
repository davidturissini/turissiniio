

	var jQuery = require('jQuery');
	var getCardById = require('./getCardById');
	

	module.exports = function (cards, evt) {
		var blogSection = jQuery(evt.target).parents('.trip-location');
		var id = blogSection.attr('id');
		var card = getCardById(id, cards);

		window.requestAnimationFrame(function () {
			if (card.isExpanded()) {
				card.collapse()
			}

		});
		
	}