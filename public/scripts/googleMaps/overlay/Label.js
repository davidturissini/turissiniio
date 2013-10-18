define(function (require) {

	var jQuery = require('jQuery');

	function Label (text) {
		this._text = text;
		this._element = jQuery('<span class="maps-label"></span>');
		
	};

	var proto = Label.prototype = new google.maps.OverlayView();


	proto.onAdd = function () {
		this._element.html(this._text);
	};


	proto.getElement = function () {
		return this._element;
	};


	proto.setPoint = function (point) {
		this._point = point;
	};


	proto.getPoint = function () {
		return this._point;
	};


	proto.draw = function () {
		var panes = this.getPanes();
		var projection = this.getProjection();
		var pixels = projection.fromLatLngToDivPixel(this.getPoint());

		this._element.appendTo(panes.floatPane);

		this._element.css({
			position:'absolute',
			left:pixels.x - this._element.width() / 2 + 'px',
			top:pixels.y + 'px'
		});


	};


	proto.onRemove = function () {
		this._element.remove();
	};
	


	return Label;

});