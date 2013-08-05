define(
	'main',

	[
		'parallax/timeline',
		'model/Trip',
		'collection/Location',
		'collection/Map',
		'view/GoogleMap'
	], 

	function (timeline, Trip, CollectionLocation, MapLocation, ViewGoogleMap) {
		var scrollY;
		var isTicking = false;


		function updateUI () {
			isTicking = false;
			timeline(scrollY);
		}



		function onTripLoad(trip) {

			window.addEventListener('scroll', function (evt) {
				scrollY = window.scrollY;
				if (!isTicking) {
					window.requestAnimationFrame(updateUI);
				}

				isTicking = true;
			});


		}

		function main() {
			var mapEl = document.querySelector('.gallery .image.map');
			var trip = document.getElementById('trip');
			var tripJSON = JSON.parse(trip.getAttribute('data-json'));
			var locations = JSON.parse(trip.getAttribute('data-locations'));
			var locationsCollection = new CollectionLocation(locations);

			var maps = JSON.parse(trip.getAttribute('data-maps'));
			var mapsCollection = new MapLocation(maps);

			var trip = new Trip(tripJSON);
			trip.setLocations(locationsCollection);
			var googleMap = new ViewGoogleMap({
				el:mapEl
			});

			googleMap.render();
			googleMap.addLocations(locationsCollection);
			googleMap.addMaps(mapsCollection);
			

			onTripLoad(trip);

		}


		return main;

	}

);