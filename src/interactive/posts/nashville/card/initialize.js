

	var Card = require('interactive/posts/nashville/card/Card');

	module.exports = function (elements) {
		var cards = [];

		elements.each(function (index, el) {
			var element = jQuery(el);
			var card = new Card(element.attr('id'), element);
			cards.push(card);
		});

		return cards;
	}