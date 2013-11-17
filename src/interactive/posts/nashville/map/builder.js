define(function (require) {

	var defaultMapOptions = {
		zoom:8,
		draggable:false,
		scrollwheel:false,
		disableDefaultUI:true,
		disableDoubleClickZoom:true,
		mapTypeId:google.maps.MapTypeId.SATELLITE
	};

	return function (el, options) {

		var mapOptions = _.extend(defaultMapOptions, options);

		return new google.maps.Map(el, mapOptions);
	}

});