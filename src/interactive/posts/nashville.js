define(function (require) {

	var Q = require('q');
	var jQuery = require('jQuery');
	var _ = require('underscore');
	var GoogleMapsLabel = require('googleMaps/overlay/Label');
	var loadStylesheet = require('element/loadStylesheet');
	var googleMapsBoundsFromLatLng = require('googleMaps/bounds/fromLatLngList');
	var loadCarData = require('interactive/posts/nashville/map/loadCarData');

	var cardInitialize = require('interactive/posts/nashville/card/initialize');
	var expandCardHandler = require('interactive/posts/nashville/card/expandHandler');
	var collapseCardHandler = require('interactive/posts/nashville/card/collapseHandler');
	
	var galleriaBuilder = require('interactive/posts/nashville/galleria/builder');
	var responsiveDimensions = require('element/responsive/windowDimensions');
	var mapBuilder = require('interactive/posts/nashville/map/builder');
	var kmlBuilder = require('interactive/posts/nashville/map/kmlBuilder');
	var markersBuilder = require('interactive/posts/nashville/map/markersBuilder');
	var mapDataMerge = require('interactive/posts/nashville/map/mergeData');

	var Timeline = require('interactive/posts/nashville/parallax/Timeline');
	var scrollHandlerBuilder = require('interactive/posts/nashville/scroll/handlerBuilder');
	
	
	var map;
	var kml;
	var onScroll;
	var onClickExpand;
	var onClickCollapse;
	var timeline;
	var cards;
	var jqBody;


	return {

		load: function (data, htmlContext) {
			jqBody = jQuery(document);
			
			jQuery('html').addClass('map');
			jQuery('#blog-content', htmlContext).prepend('<div id="map" class="google-map"></div>');
			jQuery('<div class="scroll"></div>').insertBefore(jQuery('#blog-content', htmlContext));

			jQuery('.trip-location .card', htmlContext).each(function (idx, elem) {
				jQuery('<span class="close">Close</span><span class="expand">Expand</span>').prependTo(elem);
			});

		},


		afterAppend: function (data, htmlContext) {
			var promises = [];
			var defer = Q.defer();

			var nashville = data.trip;
			var distanceSegments = data.tripDistanceSegments;
			var locationMarkers = [];
			var markers = markersBuilder(nashville.locations);
			var latLngs = _.map(markers, function (marker) {
				return marker.getPosition();
			});

			var bounds = googleMapsBoundsFromLatLng(latLngs);
			var center = bounds.getCenter();

			map = mapBuilder(jQuery('#map', htmlContext).get(0), {
				center:center
			});


			google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
				defer.resolve();
			});


			locationMarkers = mapDataMerge(markers, center);
				


			kml = kmlBuilder(nashville.maps[0].url);
			cards = cardInitialize(jQuery('.card', htmlContext));
			galleriaBuilder(jQuery('.blog-section', htmlContext), '../../vendor/galleria/themes/classic/galleria.classic.min.js', jQuery.browser.mobile);
		
			var carPromise = loadCarData().then(function (carSegments) {
				timeline = new Timeline(map, locationMarkers, distanceSegments, kml, carSegments);

				onScroll = scrollHandlerBuilder(timeline);
				onClickCollapse = collapseCardHandler.bind(undefined, cards);
				onClickExpand = expandCardHandler.bind(undefined, cards);

				jqBody.on('scroll', onScroll);
				jqBody.on('click', '.trip-location:not(.expanded) .card', onClickExpand);
				jqBody.on('click', '.trip-location.expanded .card .close', onClickCollapse);


			});


			return defer.promise;

		},

		unload: function () {
			map = null;
			jqBody.off('scroll', onScroll);
			jqBody.off('click', onClickCollapse);
			jqBody.off('click', onClickExpand);
			onScroll = null;
			onClickCollapse = null;
			onClickExpand = null;
			kml = null;
			timeline = null;
			cards = null;
			jQuery('html').removeClass('map').removeClass('static');

			cards.forEach(function (card) {
				card.collapse();
			});
		}

	};

});