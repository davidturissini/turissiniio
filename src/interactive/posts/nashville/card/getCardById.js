define(function (require) {

	return function getCardById (id, cards) {
		var match;
		cards.forEach(function (card) {
			if (card.id === id) {
				match = card;
			}
		});

		return match;
	};


});