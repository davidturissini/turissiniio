define(function (require) {

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var jqBody = jQuery(document.body);
	var Q = require('q');
	var ResponsiveImage = require('element/layout/ResponsiveImage');

	function Card (id, el, options) {
		this._element = el;
		this.id = id;
		this._cardElement = jQuery('.card', this._element);
		this._headerElement = jQuery('.header', this._element);
		this._isExpanded = false;

		this._minimizedImageHeight = jQuery('.image', this._element).height();
	};


	var proto = Card.prototype = {

		minimizedImageHeight: function () {
			return this._minimizedImageHeight;
		},

		isExpanded: function () {
			return this._isExpanded;
		},

		expand: function (imageWidth, imageHeight) {
			var defer = Q.defer();
			var galleria = jQuery('.images', this._element).data('galleria');

			this._isExpanded = true;
			this._imageWidth = imageWidth;
			jqBody.css({
				overflow:'hidden'
			});

			this._element.addClass('expanded');

			galleria.setOptions('imageCrop', false);
			galleria.refreshImage();
			galleria.resize({
				width:this._cardElement.width(),
				height:windowHeight * 0.8
			});

			galleria.refreshImage();


			return defer.promise;

		},

		collapse: function () {
			var defer = Q.defer();
			var galleria = jQuery('.images', this._element).data('galleria');
			jqBody.css({
				overflow:'auto'
			});
			

			this._element.removeClass('expanded');


			galleria.resize({
				width:windowWidth * 0.4,
				height:this.minimizedImageHeight()
			});

			galleria.setOptions('imageCrop', true);
			galleria.refreshImage();


			this._isExpanded = false;
			defer.resolve();

			return defer.promise;
		}

	};

	Object.defineProperties(proto, {
		'element': {
			get: function () {
				return this._element;
			},

			set: function (el) {
				this._element = el;
			}
		}
	})

	return Card;

});