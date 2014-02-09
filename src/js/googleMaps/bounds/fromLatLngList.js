module.exports = function fromLatLngList (latLngArray) {
	var bounds = new google.maps.LatLngBounds();

	latLngArray.forEach(function (latLng) {
		bounds = bounds.extend(latLng);
	});

	return bounds;

};
