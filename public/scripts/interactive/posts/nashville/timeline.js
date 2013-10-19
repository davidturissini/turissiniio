define(function (require) {

	var jQuery = require('jQuery');
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
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
				name:'opacity',
				from:1, 
				to:0, 
				scrollStart:0, 
				scrollDistance:windowHeight / 2.3,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				blogHeader.css({
					opacity:e.props.opacity.value
				})
			}

		);


		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:windowHeight, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				jQuery('#data').css({
					opacity:e.props.opacity.value
				})
			}

		);


		calculateParallax(

			[{
				name:'opacity',
				from:1, 
				to:0, 
				scrollStart:windowHeight * 2, 
				scrollDistance:windowHeight,
				fill:'forwards'
			}], 

			scrollY, 

			function (e) {
				jQuery('#data').css({
					opacity:e.props.opacity.value
				})
			}

		);
		

		calculateParallax(

			[{
				name:'markers',
				from:0, 
				to:1, 
				scrollStart:windowHeight * 3.5, 
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
							marker.setMap(map);
						}

						if (label) {
							label.getElement().addClass('transparent');
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

		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:windowHeight * 5.5, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				jQuery('#odometer').css({
					opacity:e.props.opacity.value
				})
			}

		);


		calculateParallax(

			[{
				name:'width',
				from:windowWidth, 
				to:106, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			},{
				name:'top',
				from:windowHeight / 4, 
				to:20, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			},{
				name:'right',
				from:0, 
				to:0, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				jQuery('#odometer').css({
					width:e.props.width.value + 'px',
					top:e.props.top.value + 'px',
					right:e.props.right.value + 'px'
				})
			}

		);
		

		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:windowHeight * 7.5, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {

				locations.forEach(function (location, index) {
					var label = location.label;
					
					if (label && label._text.toLowerCase() === 'nashville') {

						label.getElement().css({
							opacity:e.props.opacity.value
						})
					}
				});
			}

		);


		parallaxSection(nashvilleEl, {
			top:windowHeight * 8.5
		}, scrollY, windowHeight);

/*
	

		parallaxSection(jackDanielEl, {
			top:windowHeight * 8.5
		}, scrollY, windowHeight);

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