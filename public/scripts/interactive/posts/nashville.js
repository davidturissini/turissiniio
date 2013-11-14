define(function (require) {

	var jQuery = require('jQuery');
	var _ = require('underscore');
	var GoogleMapsLabel = require('googleMaps/overlay/Label');
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

	return {

		load: function (data) {
			var nashville = data.trip;
			var distanceSegments = data.tripDistanceSegments;
			var locationMarkers = [];
			var markers = markersBuilder(nashville.locations);
			var latLngs = _.map(markers, function (marker) {
				return marker.getPosition();
			});



			var bounds = googleMapsBoundsFromLatLng(latLngs);
			var center = bounds.getCenter();
			
			locationMarkers = mapDataMerge(markers, center);
			map = mapBuilder(document.querySelector('#map'), {
				center:center
			});


			kml = kmlBuilder('https://maps.google.com/maps/ms?authuser=0&vps=2&ie=UTF8&msa=0&output=kml&msid=216638687529279736200.0004eb1d930670f824b67');
			cards = cardInitialize(jQuery('.card'));
			
			loadCarData()
				.then(function (carSegments) {
					galleriaBuilder(jQuery('.blog-section'), '../../vendor/galleria/themes/classic/galleria.classic.min.js');
					timeline = new Timeline(map, locationMarkers, distanceSegments, kml, carSegments);

					onScroll = scrollHandlerBuilder(timeline);
					onClickCollapse = collapseCardHandler.bind(undefined, cards);
					onClickExpand = expandCardHandler.bind(undefined, cards);

					jQuery(document).on('scroll', onScroll);
					jQuery(document).on('click', '.trip-location:not(.expanded) .card', onClickExpand);
					jQuery(document).on('click', '.trip-location.expanded .card .close', onClickCollapse);


				});

		},

		unload: function () {
			map = undefined;
			jQuery(document).off('scroll', onScroll);
			jQuery(document).off('click', onClickCollapse);
			jQuery(document).off('click', onClickExpand);
			onScroll = undefined;
			onClickCollapse = undefined;
			onClickExpand = undefined;
			kml = undefined;
			timeline = undefined;
			cards = undefined;
		}

	};

});