

	var jQuery = require('jQuery');
	var getCardById = require('interactive/posts/nashville/card/getCardById');

	module.exports = function (cards, evt) {
		var blogSection = jQuery(evt.currentTarget);
		
		var id = blogSection.attr('id');
		var card = getCardById(id, cards);

		window.requestAnimationFrame(function () {

			if (!card.isExpanded()) {
				card.expand();
			}
		});

	}