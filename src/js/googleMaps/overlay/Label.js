var jQuery = require('jQuery');

function Label (text, options) {
	this._text = text;
	this._element = jQuery('<span class="maps-label"></span>');
	this.options = options || {};
	
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
	var offsetTop = this.options.offsetTop || 0;
	var offsetLeft = this.options.offsetLeft || 0;

	this._element.appendTo(panes.floatPane);
	this._element.css({
		position:'absolute',
		left:pixels.x - (this._element.width() / 2) + offsetLeft + 'px',
		top:pixels.y + offsetTop + 'px'
	});


};


proto.onRemove = function () {
	this._element.remove();
};



module.exports = Label;
