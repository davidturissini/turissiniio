define(function (require) {

	var jQuery = require('jQuery');
	var _ = require('underscore');
	var GoogleMapsLabel = require('googleMaps/overlay/Label');
	var lightbox = require('lightbox');
	
	var googleMapsBoundsFromLatLng = require('googleMaps/bounds/fromLatLngList');
	var map;
	var kml;
	var defaultMapOptions = {
		zoom:8,
		draggable:false,
		scrollwheel:false,
		disableDefaultUI:true,
		disableDoubleClickZoom:true
	};

	var nashvilleTimeline = require('interactive/posts/nashville/timeline');
	var onScroll;
	


	function buildOnScroll(map, locationMarkers, distanceSegments) {
		var isTicking = false;

		return function (evt) {
			var scrollY;

			if (isTicking === true) {
				return;
			}

			scrollY = window.scrollY;
			isTicking = true;

			window.requestAnimationFrame(function () {
				nashvilleTimeline(scrollY, map, locationMarkers, distanceSegments, kml);

				isTicking = false;

			});
			
		};
	};



	return {

		load: function (data) {
			var nashville = data.trip;
			var distanceSegments = data.tripDistanceSegments;
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

				locationMarkers.push({
					marker:marker,
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

			var kmlUrl = 'https://maps.google.com/maps/ms?authuser=0&vps=2&ie=UTF8&msa=0&output=kml&msid=216638687529279736200.0004e9bd93e7f6902bd47';
			kml = new google.maps.KmlLayer({
				url:kmlUrl,
				preserveViewport:true,
				screenOverlays:false
			});

			onScroll = buildOnScroll(map, locationMarkers, distanceSegments);
			jQuery(document).on('scroll', onScroll);


		},

		unload: function () {
			map = undefined;
			jQuery(document).off('scroll', onScroll);
			onScroll = undefined;
			kml = undefined;
		}

	};

});