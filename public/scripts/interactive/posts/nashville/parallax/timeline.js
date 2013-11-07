define(function (require) {

	var jQuery = require('jQuery');
	var siteHeaderParallax = require('parallax/elements/siteHeader');
	var calculateParallax = require('parallax/calculate');
	var parallaxSection = require('interactive/posts/nashville/parallax/parallaxSection');
	var panMap = require('interactive/posts/nashville/parallax/panMap');

	var Car = require('interactive/posts/nashville/map/Car');
	var driveCar = require('interactive/posts/nashville/parallax/driveCar');

	var responsiveDimensions = require('element/responsive/windowDimensions');


	var blogHeader = jQuery('#blog-header');
	var blogHeaderOffset = blogHeader.offset();

	var dashboardEl = jQuery('#dashboard');
	
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

	function advanceTimeline (scrollY, map, locations, distanceSegments, kml, carSegments, carMarker) {
		if (scrollY < 0) {
			scrollY = 0;
		}

		siteHeaderParallax(scrollY);

		calculateParallax(

			[{
				name:'y',
				from:0, 
				to:-responsiveDimensions.windowHeight, 
				scrollStart:0, 
				scrollDistance:responsiveDimensions.windowHeight,
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
				scrollDistance:responsiveDimensions.windowHeight / 2.3,
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
				scrollStart:responsiveDimensions.windowHeight, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				jQuery('#intro').css({
					opacity:e.props.opacity.value
				})
			}

		);




		calculateParallax(

			[{
				name:'opacity',
				from:1, 
				to:0, 
				scrollStart:responsiveDimensions.windowHeight * 2, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'forwards'
			}], 

			scrollY, 

			function (e) {
				jQuery('#intro').css({
					opacity:e.props.opacity.value
				})
			}

		);

		calculateParallax(

			[{
				name:'markers',
				from:0, 
				to:1, 
				scrollStart:responsiveDimensions.windowHeight * 3.5, 
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
		


		panMap(map, locations[0], locations[1], responsiveDimensions.windowHeight * 4.5, responsiveDimensions.windowHeight, 'both', scrollY, 0, 0);


		calculateParallax(

			[{
				name:'opacity',
				from:0, 
				to:1, 
				scrollStart:responsiveDimensions.windowHeight * 5.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				dashboardEl.css({
					opacity:e.props.opacity.value
				})
			}

		);


		calculateParallax(

			[{
				name:'top',
				from:responsiveDimensions.windowHeight / 4, 
				to:10, 
				scrollStart:responsiveDimensions.windowHeight * 6.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			},{
				name:'right',
				from:responsiveDimensions.windowWidth / 2, 
				to:10, 
				scrollStart:responsiveDimensions.windowHeight * 6.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			},{
				name:'x',
				from:50, 
				to:0, 
				scrollStart:responsiveDimensions.windowHeight * 6.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			},{
				name:'fontSize',
				from:1.8, 
				to:1, 
				scrollStart:responsiveDimensions.windowHeight * 6.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				dashboardEl.css({
					fontSize:e.props.fontSize.value + 'em',
					transform:'translateX(' + e.props.x.value + '%)',
					width:'auto',
					top:e.props.top.value + 'px',
					right:e.props.right.value + 'px'
				})
			}

		);

		calculateParallax(

			[{
				name:'car',
				from:0, 
				to:1, 
				scrollStart:responsiveDimensions.windowHeight * 7.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				if(e.props.car.value > 0 && carMarker.getMap() === undefined) {
					carMarker.setMap(map);
				} else if (e.props.car.value <= 0 && carMarker.getMap() !== undefined) {
					carMarker.setMap(undefined);
				}
			}

		);


		parallaxSection(nashvilleEl, {
			top:responsiveDimensions.windowHeight * 7.5
		}, scrollY, responsiveDimensions.windowHeight, locations[1].marker, map);


		/* Lynchburg */
		panMap(map, locations[1], locations[2], responsiveDimensions.windowHeight * 8.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, 0, distanceSegments[0]);
		driveCar(carSegments[0], carMarker, responsiveDimensions.windowHeight * 8.5, responsiveDimensions.windowHeight * 4, 'both', scrollY);

		parallaxSection(lynchburgEl, {
			top:responsiveDimensions.windowHeight * 11.5
		}, scrollY, responsiveDimensions.windowHeight, locations[2].marker, map);


		/* Lookout Mountain */
		panMap(map, locations[2], locations[3], responsiveDimensions.windowHeight * 12.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, distanceSegments[0], distanceSegments[1]);
		driveCar(carSegments[1], carMarker, responsiveDimensions.windowHeight * 12.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(lookOutMountainEl, {
			top:responsiveDimensions.windowHeight * 15.5
		}, scrollY, responsiveDimensions.windowHeight, locations[3].marker, map);


		/* Smokey Mountains */
		panMap(map, locations[3], locations[4], responsiveDimensions.windowHeight * 16.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 1), distanceSegments[2]);
		driveCar(carSegments[2], carMarker, responsiveDimensions.windowHeight * 16.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(smokeyMountainsEl, {
			top:responsiveDimensions.windowHeight * 19.5
		}, scrollY, responsiveDimensions.windowHeight, locations[4].marker, map);


		/* PISGAH */
		panMap(map, locations[4], locations[5], responsiveDimensions.windowHeight * 20.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 2), distanceSegments[3]);
		driveCar(carSegments[3], carMarker, responsiveDimensions.windowHeight * 20.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(mtPisgahEl, {
			top:responsiveDimensions.windowHeight * 23.5
		}, scrollY, responsiveDimensions.windowHeight, locations[5].marker, map);


		/* Grandfather Mountain */
		panMap(map, locations[5], locations[6], responsiveDimensions.windowHeight * 24.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 3), distanceSegments[4]);
		driveCar(carSegments[4], carMarker, responsiveDimensions.windowHeight * 24.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(grandfatherMountainEl, {
			top:responsiveDimensions.windowHeight * 27.5
		}, scrollY, responsiveDimensions.windowHeight, locations[6].marker, map);


		/* Blue Ridge Parkway */
		panMap(map, locations[6], locations[7], responsiveDimensions.windowHeight * 28.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4), distanceSegments[5] / 2);
		driveCar(carSegments[5], carMarker, responsiveDimensions.windowHeight * 28.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(blueRidgeParkwayEl, {
			top:responsiveDimensions.windowHeight * 31.5
		}, scrollY, responsiveDimensions.windowHeight, locations[7].marker, map);


		/* Asheville */
		panMap(map, locations[7], locations[8], responsiveDimensions.windowHeight * 32.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4) + distanceSegments[5] / 2, distanceSegments[5] / 2);
		driveCar(carSegments[6], carMarker, responsiveDimensions.windowHeight * 32.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);

		parallaxSection(ashevilleEl, {
			top:responsiveDimensions.windowHeight * 35.5
		}, scrollY, responsiveDimensions.windowHeight, locations[8].marker, map);


		/* Grand Ole Opry */
		panMap(map, locations[8], locations[9], responsiveDimensions.windowHeight * 36.5, responsiveDimensions.windowHeight * 16, 'forwards', scrollY, sumDistances(distanceSegments, 0, 5), distanceSegments[6]);
		driveCar(carSegments[7], carMarker, responsiveDimensions.windowHeight * 36.5, responsiveDimensions.windowHeight * 16, 'forwards', scrollY);

		parallaxSection(grandOleOpryEl, {
			top:responsiveDimensions.windowHeight * 51.5
		}, scrollY, responsiveDimensions.windowHeight, locations[9].marker, map);


		
	};

	function Timeline (map, locations, distanceSegments, kml, carSegments) {
		this.map = map;
		this.locations = locations;
		this.distanceSegments = distanceSegments;
		this.kml = kml;
		this.carSegments = carSegments;
		this.carMarker = window.car = new Car('/images/car.png', map);
	};


	Timeline.prototype = {
		advance: function (scrollY) {
			advanceTimeline(scrollY, this.map, this.locations, this.distanceSegments, this.kml, this.carSegments, this.carMarker);
		}
	};

	return Timeline;

});