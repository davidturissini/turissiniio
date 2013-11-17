define(function (require) {

	var Card = require('interactive/posts/nashville/card/Card');

	return function (elements) {
		var cards = [];

		elements.each(function (index, el) {
			var element = jQuery(el).parents('.blog-section');
			var card = new Card(element.attr('id'), element);
			cards.push(card);
		});

		return cards;
	}

});