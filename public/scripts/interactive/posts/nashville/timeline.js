define(function (require) {

	var jQuery = require('jQuery');
	var windowHeight = window.innerHeight;
	var siteHeaderParallax = require('parallax/elements/siteHeader');
	var calculateParallax = require('parallax/calculate');
	var parallaxSection = require('interactive/posts/nashville/parallaxSection');


	var blogHeader = jQuery('#blog-header');
	var blogHeaderOffset = blogHeader.offset();
	
	var nashvilleEl = jQuery('#nashville');
	var jackDanielEl = jQuery('#jack-daniels');
	var lookOutMountainEl = jQuery('#lookout-mountain');
	var mtPisgahEl = jQuery('#mt-pisgah');
	var blueRidgeParkwayEl = jQuery('#blue-ridge-parkway');
	var smokeyMountainsEl = jQuery('#smokey-mountains');


	

	var markersAdded = false;
	return function advanceTimeline (scrollY, map, locations) {
		if (scrollY < 0) {
			scrollY = 0;
		}

		siteHeaderParallax(scrollY);

		calculateParallax(

			[{
				name:'y',
				from:0, 
				to:-windowHeight, 
				scrollStart:0, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				blogHeader.css({
					transform:'translate3d(0, ' + e.props.y.value + 'px, 0)'
				})
			}

		);

		calculateParallax(

			[{
				name:'markers',
				from:0, 
				to:1, 
				scrollStart:windowHeight, 
				scrollDistance:1,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				if (e.props.markers.value === 1 && markersAdded === false) {
					locations.forEach(function (location, index) {
						var marker = location.marker;
						var label = location.label;

						if (marker) {
							marker.setAnimation(google.maps.Animation.DROP);
							marker.setMap(map);
						}

						if (label) {
							label.setMap(map);
						}
					});

					markersAdded = true;
				} else if (e.props.markers.value === 0 && markersAdded === true) {
					locations.forEach(function (location) {
						var marker = location.marker;
						var label = location.label;

						if (marker) {
							marker.setMap(null);
						}

						if (label) {
							label.setMap(null);
						}
					});

					markersAdded = false;
				}
			}

		);


		calculateParallax(

			[{
				name:'latitude',
				from:locations[0].latLng.lat(), 
				to:locations[1].latLng.lat(), 
				scrollStart:windowHeight * 4.5, 
				scrollDistance:windowHeight,
				fill:'both'
			},{
				name:'longitude',
				from:locations[0].latLng.lng(), 
				to:locations[1].latLng.lng(), 
				scrollStart:windowHeight * 4.5, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				var center = new google.maps.LatLng(e.props.latitude.value, e.props.longitude.value);
				map.setCenter(center);
			}

		);


		parallaxSection(nashvilleEl, {
			top:windowHeight * 5.5
		}, scrollY, windowHeight);


		calculateParallax(

			[{
				name:'latitude',
				from:locations[1].latLng.lat(), 
				to:locations[2].latLng.lat(), 
				scrollStart:windowHeight * 7.5, 
				scrollDistance:windowHeight,
				fill:'forwards'
			},{
				name:'longitude',
				from:locations[1].latLng.lng(), 
				to:locations[2].latLng.lng(), 
				scrollStart:windowHeight * 7.5, 
				scrollDistance:windowHeight,
				fill:'forwards'
			}], 

			scrollY, 

			function (e) {
				if (e.props.latitude.value) {
					var center = new google.maps.LatLng(e.props.latitude.value, e.props.longitude.value);
					map.setCenter(center);
				}
			}

		);
		

		parallaxSection(jackDanielEl, {
			top:windowHeight * 8.5
		}, scrollY, windowHeight);
/*
		parallaxSection(lookOutMountainEl, {
			top:windowHeight * 8.5
		}, scrollY);
		parallaxSection(mtPisgahEl, {
			top:windowHeight * 11.5
		}, scrollY);
		parallaxSection(blueRidgeParkwayEl, {
			top:windowHeight * 14.5
		}, scrollY);
		parallaxSection(smokeyMountainsEl, {
			top:windowHeight * 17.5
		}, scrollY);
		*/

		
	}

});