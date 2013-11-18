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
			var blogContent = jQuery('#blog-content', htmlContext);
			var scrollToContinue = jQuery('<div id="scroll-to-continue" class="text-shadow scroll-to-continue vert-bottom text-white text-center">Scroll to take a drive<span class="caret">^</span><span class="caret">^</span></div>');

			
			jQuery('html').addClass('map');
			blogContent.prepend('<div id="map" class="google-map"></div>');
			blogContent.addClass('fixed-full');
			jQuery('#content').addClass('fixed-full');

			jQuery('#blog-header', htmlContext).addClass('full-height fixed-full');
			jQuery('#blog-header .text', htmlContext).addClass('vert-center text-shadow');

			jQuery('#intro', htmlContext).addClass('full-height vert-center text-shadow transparent fixed-full');
			jQuery('.trip-location .post-header .title', htmlContext).addClass('text-shadow');

			jQuery('<div class="scroll"></div>').insertBefore(blogContent);
			scrollToContinue.appendTo(blogContent);

			jQuery('.trip-location', htmlContext).each(function (idx, elem) {
				var cardEl = jQuery('<div class="card"></div>');
				var el = jQuery(elem);
				el.addClass('full-height transparent fixed-full');
				cardEl.append(el.children()).appendTo(el);
				jQuery('<span class="close">Close</span><span class="expand">Expand</span>').prependTo(cardEl);
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
				jQuery('html').addClass('map-ready');
				jQuery('#content').removeClass('fixed-full');
				defer.resolve();
			});


			locationMarkers = mapDataMerge(markers, center);
				


			kml = kmlBuilder(nashville.maps[0].url);
			cards = cardInitialize(jQuery('.trip-location', htmlContext));

			if (responsiveDimensions.windowWidth < 700) {
				google.maps.event.addListenerOnce(kml, 'defaultviewport_changed', function () {
					if (kml.getStatus() === 'OK') {
						map.fitBounds(kml.getDefaultViewport());
					}
				});
			}

			var carPromise = loadCarData().then(function (carSegments) {
				timeline = new Timeline(map, locationMarkers, distanceSegments, kml, carSegments);

				onScroll = scrollHandlerBuilder(timeline);
				onClickCollapse = collapseCardHandler.bind(undefined, cards);
				onClickExpand = expandCardHandler.bind(undefined, cards);

				jqBody.on('scroll', onScroll);
				jqBody.on('click', '.trip-location:not(.expanded)', onClickExpand);
				jqBody.on('click', '.trip-location.expanded .close', onClickCollapse);


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


			cards.forEach(function (card) {
				card.collapse();
			});



			cards = null;
		},

		afterRemove: function () {
			jQuery('html').removeClass('map-ready');
			jQuery('html').removeClass('map');
		}

	};

});