define(function (require) {

	var jQuery = require('jQuery');

	function Car (imagePath, map) {
		this._imagePath = imagePath;
		this._map = map;
		this._position = null;

	};


	var proto = Car.prototype = new google.maps.OverlayView();


	proto.onAdd = function () {
		this._element = jQuery('<img class="marker-car" />');
		this._element.attr({
			src:this._imagePath
		});

		this._element.css({
			position:'absolute'
		});

		var panes = this.getPanes();
		this._element.appendTo(panes.floatPane);

	};


	proto.setPosition = function (latLng) {
		var overlayProjection = this.getProjection();
		this._position = latLng;
		if (!overlayProjection || !this._element) {
			return;
		}

		var position = overlayProjection.fromLatLngToDivPixel(latLng);

		var left = position.x - this._element.width() / 2;
		var top = position.y - this._element.height() / 2;

		this._element.css({
			left:left + 'px',
			top:top + 'px'
		});
	};


	proto.driving = function () {
		if (this._element) {
			this._element.addClass('driving');
		}
	};


	proto.parked = function () {
		if (this._element) {
			this._element.removeClass('driving');
		}
	};


	proto.getPosition = function () {
		return this._position;
	};


	proto.draw = function () {
		var overlayProjection = this.getProjection();

	};


	proto.onRemove = function () {
		this._element.remove();
	};


	return Car;

});