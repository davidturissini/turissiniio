define(function (require) {

	var jQuery = require('jQuery');
	var siteHeaderParallax = require('parallax/elements/siteHeader');
	var calculateParallax = require('parallax/calculate');
	var parallaxSection = require('interactive/posts/nashville/parallax/parallaxSection');
	var panMap = require('interactive/posts/nashville/parallax/panMap');
	var updateOdometer = require('interactive/posts/nashville/parallax/updateOdometer');
	var addMarkerClick = require('interactive/posts/nashville/map/addMarkerClick');

	var Car = require('interactive/posts/nashville/map/Car');
	var driveCar = require('interactive/posts/nashville/parallax/driveCar');

	var responsiveDimensions = require('element/responsive/windowDimensions');

	var blogContent = jQuery('#blog-content');
	var blogHeader = jQuery('#blog-header');
	var blogHeaderOffset = blogHeader.offset();

	var dashboardEl = jQuery('#dashboard');
	var introEl = jQuery('#intro');

	var nashvilleEl = jQuery('#nashville-tennessee');
	var lynchburgEl = jQuery('#lynchburg-tennessee');
	var lookOutMountainEl = jQuery('#lookout-mountain-georgia');
	var smokeyMountainsEl = jQuery('#great-smokey-mountains-national-park');
	var mtPisgahEl = jQuery('#pisgah-inn-north-carolina');
	var grandfatherMountainEl = jQuery('#grandfather-mountain-north-carolina');
	var blueRidgeParkwayEl = jQuery('#blue-ridge-parkway');
	var ashevilleEl = jQuery('#asheville-north-carolina');
	var grandOleOpryEl = jQuery('#grand-ole-opry-nashville-tennessee');

	var markersAdded;


	function fetchElements() {
		blogContent = jQuery('#blog-content');
		blogHeader = jQuery('#blog-header');
		blogHeaderOffset = blogHeader.offset();

		dashboardEl = jQuery('#dashboard');
		introEl = jQuery('#intro');

		nashvilleEl = jQuery('#nashville-tennessee');
		lynchburgEl = jQuery('#lynchburg-tennessee');
		lookOutMountainEl = jQuery('#lookout-mountain-georgia');
		smokeyMountainsEl = jQuery('#great-smokey-mountains-national-park');
		mtPisgahEl = jQuery('#pisgah-inn-north-carolina');
		grandfatherMountainEl = jQuery('#grandfather-mountain-north-carolina');
		blueRidgeParkwayEl = jQuery('#blue-ridge-parkway');
		ashevilleEl = jQuery('#asheville-north-carolina');
		grandOleOpryEl = jQuery('#grand-ole-opry-nashville-tennessee');

		markersAdded = false;
	}


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
				var styles = {
					opacity:e.props.opacity.value,
					display:'block'
				};

				if (e.props.opacity.value === 0) {
					styles.display = 'none';
				}

				introEl.css(styles);
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
				var styles = {
					opacity:e.props.opacity.value,
					display:'block'
				};

				if (e.props.opacity.value === 0) {
					styles.display = 'none';
				}

				introEl.css(styles);
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
					map.setOptions({
						mapTypeId:google.maps.MapTypeId.HYBRID
					});
					
					kml.setMap(map);

					locations.forEach(function (location) {
						if (location.marker) {
							location.marker.setIcon('https://s3.amazonaws.com/traveladdict/images/maps/map_tack.png');
							location.marker.setMap(map);
						}
					});

					markersAdded = true;
				} else if (e.props.markers.value === 0 && markersAdded === true) {
					kml.setMap(null);
					map.setOptions({
						mapTypeId:google.maps.MapTypeId.SATELLITE
					});

					locations.forEach(function (location) {
						if (location.marker) {
							location.marker.setMap(null);
						}
					});

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
				to:0, 
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
				name:'scale',
				from:1.8, 
				to:1, 
				scrollStart:responsiveDimensions.windowHeight * 6.5, 
				scrollDistance:responsiveDimensions.windowHeight,
				fill:'both'
			}], 

			scrollY, 

			function (e) {
				dashboardEl.css({
					transform:'scale(' + e.props.scale.value + ') translateY(' + e.props.top.value + 'px)'
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
				if(e.props.car.value > 0 && !carMarker.getMap()) {
					carMarker.setMap(map);
				} else if (e.props.car.value <= 0 && carMarker.getMap()) {
					carMarker.setMap(null);
				}
			}

		);

		addMarkerClick(locations[1], responsiveDimensions.windowHeight * 8.5);

		parallaxSection(nashvilleEl, {
			top:responsiveDimensions.windowHeight * 8
		}, scrollY, responsiveDimensions.windowHeight, locations[1].marker, map);


		/* Lynchburg */
		panMap(map, locations[1], locations[2], responsiveDimensions.windowHeight * 8.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, 0, distanceSegments[0]);
		driveCar(carSegments[0], carMarker, responsiveDimensions.windowHeight * 8.5, responsiveDimensions.windowHeight * 4, 'both', scrollY);
		addMarkerClick(locations[2], responsiveDimensions.windowHeight * 12.5);
		updateOdometer(map, locations[1], locations[2], responsiveDimensions.windowHeight * 8.5, responsiveDimensions.windowHeight * 4, 'both', scrollY, 0, distanceSegments[0]);


		parallaxSection(lynchburgEl, {
			top:responsiveDimensions.windowHeight * 12
		}, scrollY, responsiveDimensions.windowHeight, locations[2].marker, map);


		/* Lookout Mountain */
		panMap(map, locations[2], locations[7], responsiveDimensions.windowHeight * 12.5, responsiveDimensions.windowHeight * 20, 'forwards', scrollY, distanceSegments[0], distanceSegments[1]);
		driveCar(carSegments[1], carMarker, responsiveDimensions.windowHeight * 12.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[3], responsiveDimensions.windowHeight * 16.5);
		updateOdometer(map, locations[2], locations[3], responsiveDimensions.windowHeight * 12.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, distanceSegments[0], distanceSegments[1]);

		parallaxSection(lookOutMountainEl, {
			top:responsiveDimensions.windowHeight * 16
		}, scrollY, responsiveDimensions.windowHeight, locations[3].marker, map);


		/* Smokey Mountains */
		driveCar(carSegments[2], carMarker, responsiveDimensions.windowHeight * 16.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[4], responsiveDimensions.windowHeight * 20.5);
		updateOdometer(map, locations[3], locations[4], responsiveDimensions.windowHeight * 16.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 1), distanceSegments[2]);

		parallaxSection(smokeyMountainsEl, {
			top:responsiveDimensions.windowHeight * 20
		}, scrollY, responsiveDimensions.windowHeight, locations[4].marker, map);


		/* PISGAH */
		driveCar(carSegments[3], carMarker, responsiveDimensions.windowHeight * 20.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[5], responsiveDimensions.windowHeight * 24.5);
		updateOdometer(map, locations[4], locations[5], responsiveDimensions.windowHeight * 20.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 2), distanceSegments[3]);

		parallaxSection(mtPisgahEl, {
			top:responsiveDimensions.windowHeight * 24
		}, scrollY, responsiveDimensions.windowHeight, locations[5].marker, map);


		/* Grandfather Mountain */
		driveCar(carSegments[4], carMarker, responsiveDimensions.windowHeight * 24.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[6], responsiveDimensions.windowHeight * 28.5);
		updateOdometer(map, locations[5], locations[6], responsiveDimensions.windowHeight * 24.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 3), distanceSegments[4]);

		parallaxSection(grandfatherMountainEl, {
			top:responsiveDimensions.windowHeight * 28
		}, scrollY, responsiveDimensions.windowHeight, locations[6].marker, map);


		/* Blue Ridge Parkway */
		driveCar(carSegments[5], carMarker, responsiveDimensions.windowHeight * 28.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[7], responsiveDimensions.windowHeight * 32.5);
		updateOdometer(map, locations[6], locations[7], responsiveDimensions.windowHeight * 28.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4), distanceSegments[5]);

		parallaxSection(blueRidgeParkwayEl, {
			top:responsiveDimensions.windowHeight * 32
		}, scrollY, responsiveDimensions.windowHeight, locations[7].marker, map);


		/* Asheville */
		panMap(map, locations[7], locations[8], responsiveDimensions.windowHeight * 32.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4) + distanceSegments[5] / 2, distanceSegments[5] / 2);
		driveCar(carSegments[6], carMarker, responsiveDimensions.windowHeight * 32.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY);
		addMarkerClick(locations[8], responsiveDimensions.windowHeight * 36.5);
		updateOdometer(map, locations[7], locations[8], responsiveDimensions.windowHeight * 32.5, responsiveDimensions.windowHeight * 4, 'forwards', scrollY, sumDistances(distanceSegments, 0, 4) + distanceSegments[5] / 2, distanceSegments[5] / 2);

		parallaxSection(ashevilleEl, {
			top:responsiveDimensions.windowHeight * 36
		}, scrollY, responsiveDimensions.windowHeight, locations[8].marker, map);


		/* Grand Ole Opry */
		panMap(map, locations[8], locations[9], responsiveDimensions.windowHeight * 36.5, responsiveDimensions.windowHeight * 16, 'forwards', scrollY, sumDistances(distanceSegments, 0, 5), distanceSegments[6]);
		driveCar(carSegments[7], carMarker, responsiveDimensions.windowHeight * 36.5, responsiveDimensions.windowHeight * 16, 'forwards', scrollY);
		addMarkerClick(locations[9], responsiveDimensions.windowHeight * 52.5);
		updateOdometer(map, locations[8], locations[9], responsiveDimensions.windowHeight * 36.5, responsiveDimensions.windowHeight * 16, 'forwards', scrollY, sumDistances(distanceSegments, 0, 5), distanceSegments[6]);

		parallaxSection(grandOleOpryEl, {
			top:responsiveDimensions.windowHeight * 52
		}, scrollY, responsiveDimensions.windowHeight, locations[9].marker, map);


	};

	function Timeline (map, locations, distanceSegments, kml, carSegments) {
		this.map = map;
		this.locations = locations;
		this.distanceSegments = distanceSegments;
		this.kml = kml;
		this.carSegments = carSegments;
		this.carMarker = window.car = new Car('/images/car.png', map);
		fetchElements();
	};


	Timeline.prototype = {
		advance: function (scrollY) {
			advanceTimeline(scrollY, this.map, this.locations, this.distanceSegments, this.kml, this.carSegments, this.carMarker);
		}
	};

	return Timeline;

});