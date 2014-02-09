

	module.exports = function getCardById (id, cards) {
		var match;
		cards.forEach(function (card) {
			if (card.id === id) {
				match = card;
			}
		});

		return match;
	};