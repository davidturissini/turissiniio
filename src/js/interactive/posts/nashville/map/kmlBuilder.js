

	module.exports = function (url) {
		
		return new google.maps.KmlLayer({
			url:url,
			preserveViewport:true,
			screenOverlays:false,
			clickable:false
		});
	}