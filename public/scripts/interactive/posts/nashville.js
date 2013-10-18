define(function (require) {

	var jQuery = require('jQuery');
	var _ = require('underscore');
	var GoogleMapsLabel = require('googleMaps/overlay/Label');
	
	var googleMapsBoundsFromLatLng = require('googleMaps/bounds/fromLatLngList');
	var map;
	var defaultMapOptions = {
		zoom:7,
		draggable:false,
		scrollwheel:false,
		disableDefaultUI:true,
		disableDoubleClickZoom:true
	};

	var nashvilleTimeline = require('interactive/posts/nashville/timeline');
	var onScroll;
	


	function buildOnScroll(map, locationMarkers) {
		var isTicking = false;

		return function (evt) {
			var scrollY;

			if (isTicking === true) {
				return;
			}

			scrollY = window.scrollY;
			isTicking = true;

			window.requestAnimationFrame(function () {
				nashvilleTimeline(scrollY, map, locationMarkers);

				isTicking = false;

			});
			
		};
	};



	return {

		load: function (data) {
			var nashville = data.trip;
			var latLngArray = [];
			var locationMarkers = [];
			var centerLatLng = new google.maps.LatLng(nashville.locations[0].latitude, nashville.locations[0].longitude);
			var mapOptions = _.extend(defaultMapOptions, {
				center:centerLatLng,
				mapTypeId:google.maps.MapTypeId.SATELLITE
			});

			

			nashville.locations.forEach(function (locationData) {
				var latLng = new google.maps.LatLng(locationData.latitude, locationData.longitude);
				var marker = new google.maps.Marker({
					position:latLng
				});

				var label = new GoogleMapsLabel(locationData.city);
				label.setPoint(latLng);

				label.getElement().addClass('text-white text-big');

				locationMarkers.push({
					marker:marker,
					label:label,
					latLng:latLng
				});

				latLngArray.push(latLng);

			});

			var bounds = googleMapsBoundsFromLatLng(latLngArray);

			mapOptions.center = bounds.getCenter();
			locationMarkers.unshift({
				latLng:mapOptions.center
			});
			map = new google.maps.Map(document.querySelector('#map'), mapOptions);

			onScroll = buildOnScroll(map, locationMarkers);
			jQuery(document).on('scroll', onScroll);

		},

		unload: function () {
			map = undefined;
			jQuery(document).off('scroll', onScroll);
		}

	};

});