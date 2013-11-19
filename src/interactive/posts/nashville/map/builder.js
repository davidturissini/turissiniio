define(function (require) {

	var defaultMapOptions = {
		zoom:8,
		draggable:false,
		scrollwheel:false,
		disableDefaultUI:true,
		disableDoubleClickZoom:true,
		styles:[
		  {
		    "featureType": "landscape",
		    "stylers": [
		      { "hue": "#2bff00" },
		      { "saturation": 33 },
		      { "lightness": 100 },
		      { "color": "#f6f4ef" }
		    ]
		  },{
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      { "weight": 0.3 },
		      { "color": "#afabbe" }
		    ]
		  },{
		    "elementType": "labels",
		    "stylers": [
		      { "visibility": "on" }
		    ]
		  },{
		    "featureType": "water",
		    "stylers": [
		      { "saturation": -39 },
		      { "color": "#8ccccc" }
		    ]
		  },{
		  },{
		  },{
		  }
		]
	};

	return function (el, options) {

		var mapOptions = _.extend(defaultMapOptions, options);

		return new google.maps.Map(el, mapOptions);
	}

});