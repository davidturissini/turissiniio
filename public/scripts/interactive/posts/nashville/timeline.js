define(function (require) {

	var jQuery = require('jQuery');
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var siteHeaderParallax = require('parallax/elements/siteHeader');
	var calculateParallax = require('parallax/calculate');
	var parallaxSection = require('interactive/posts/nashville/parallaxSection');
	var panMap = require('interactive/posts/nashville/panMap');


	var blogHeader = jQuery('#blog-header');
	var blogHeaderOffset = blogHeader.offset();

	var odometerEl = jQuery('#odometer');
	
	var nashvilleEl = jQuery('#nashville');
	var lynchburgEl = jQuery('#lynchburg');
	var lookOutMountainEl = jQuery('#lookout-mountain');
	var smokeyMountainsEl = jQuery('#smokey-mountains');
	var mtPisgahEl = jQuery('#mt-pisgah');
	var grandfatherMountainEl = jQuery('#grandfather-mountain');
	var blueRidgeParkwayEl = jQuery('#blue-ridge-parkway');
	var ashevilleEl = jQuery('#asheville');
	var grandOleOpryEl = jQuery('#grand-ole-opry');


	

	var markersAdded = false;


	function sumDistances (distanceSegments, startIndex, stopIndex) {
		var sum = 0;

		for(var i = startIndex; i <= stopIndex; i += 1) {
			sum += distanceSegments[i];
		}

		return sum;
	};

	return function advanceTimeline (scrollY, map, locations, distanceSegments, kml) {
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
					kml.setMap(map);



					markersAdded = true;
				} else if (e.props.markers.value === 0 && markersAdded === true) {
					kml.setMap(null);
					

					markersAdded = false;
				}
			}

		);
		


		panMap(map, locations[0], locations[1], windowHeight * 4.5, windowHeight, 'both', scrollY, 0, 0);


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
				odometerEl.css({
					opacity:e.props.opacity.value
				})
			}

		);


		calculateParallax(

			[{
				name:'top',
				from:windowHeight / 4, 
				to:10, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			},{
				name:'right',
				from:windowWidth / 2, 
				to:10, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			},{
				name:'x',
				from:50, 
				to:0, 
				scrollStart:windowHeight * 6.5, 
				scrollDistance:windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				odometerEl.css({
					transform:'translateX(' + e.props.x.value + '%)',
					width:'auto',
					top:e.props.top.value + 'px',
					right:e.props.right.value + 'px'
				})
			}

		);


		parallaxSection(nashvilleEl, {
			top:windowHeight * 8.5
		}, scrollY, windowHeight, locations[1].marker, map);


		/* Lynchburg */
		panMap(map, locations[1], locations[2], windowHeight * 14.5, windowHeight, 'forwards', scrollY, 0, distanceSegments[0]);


		parallaxSection(lynchburgEl, {
			top:windowHeight * 15.5
		}, scrollY, windowHeight, locations[2].marker, map);


		/* Lookout Mountain */
		panMap(map, locations[2], locations[3], windowHeight * 20.5, windowHeight, 'forwards', scrollY, distanceSegments[0], distanceSegments[1]);


		parallaxSection(lookOutMountainEl, {
			top:windowHeight * 21.5
		}, scrollY, windowHeight, locations[3].marker, map);


		/* Smokey Mountains */
		panMap(map, locations[3], locations[4], windowHeight * 26.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 1), distanceSegments[2]);


		parallaxSection(smokeyMountainsEl, {
			top:windowHeight * 27.5
		}, scrollY, windowHeight, locations[4].marker, map);


		/* PISGAH */
		panMap(map, locations[4], locations[5], windowHeight * 32.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 2), distanceSegments[3]);


		parallaxSection(mtPisgahEl, {
			top:windowHeight * 33.5
		}, scrollY, windowHeight, locations[5].marker, map);


		/* Grandfather Mountain */
		panMap(map, locations[5], locations[6], windowHeight * 38.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 3), distanceSegments[4]);


		parallaxSection(grandfatherMountainEl, {
			top:windowHeight * 39.5
		}, scrollY, windowHeight, locations[6].marker, map);


		/* Blue Ridge Parkway */
		panMap(map, locations[6], locations[7], windowHeight * 44.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4), distanceSegments[5] / 2);


		parallaxSection(blueRidgeParkwayEl, {
			top:windowHeight * 45.5
		}, scrollY, windowHeight, locations[7].marker, map);


		/* Asheville */
		panMap(map, locations[7], locations[8], windowHeight * 50.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4) + distanceSegments[5] / 2, distanceSegments[5] / 2);

		parallaxSection(ashevilleEl, {
			top:windowHeight * 51.5
		}, scrollY, windowHeight, locations[8].marker, map);


		/* Grand Ole Opry */
		panMap(map, locations[8], locations[9], windowHeight * 56.5, windowHeight, 'forwards', scrollY, sumDistances(distanceSegments, 0, 5), distanceSegments[6]);


		parallaxSection(grandOleOpryEl, {
			top:windowHeight * 57.5
		}, scrollY, windowHeight, locations[9].marker, map);


		
	}

});