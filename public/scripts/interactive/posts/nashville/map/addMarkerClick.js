define(function (require) {

	return function (locationData, targetScroll) {

		if (locationData.handlerAdded !== true) {
			locationData.handlerAdded = true;
			google.maps.event.addListener(locationData.marker, 'click', window.scrollTo.bind(window, 0, targetScroll));
		}

	}

});