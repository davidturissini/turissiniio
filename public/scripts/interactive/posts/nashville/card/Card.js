define(function (require) {

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var jqBody = jQuery(document.body);
	var Q = require('Q');
	var ResponsiveImage = require('element/layout/ResponsiveImage');

	function Card (id, el, options) {
		this._element = el;
		this.id = id;
		this._cardElement = jQuery('.card', this._element);
		this._headerElement = jQuery('.header', this._element);
		this._isExpanded = false;
		this._responsiveImage = new ResponsiveImage(jQuery('.image', this._element), {
			maxHeight:Math.floor(windowHeight * 0.8)
		});

		this._minimizedImageHeight = jQuery('.image', this._element).height();
	};


	var proto = Card.prototype = {

		minimizedImageHeight: function () {
			return this._minimizedImageHeight;
		},

		isExpanded: function () {
			return this._isExpanded;
		},

		__horizDistance: function () {
			return (windowWidth / 2 - this._imageWidth / 2 );
		},

		__vertDistance: function () {
			return (windowHeight * 0.1);
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

			
			this._cardElement.css({
				width:imageWidth + 'px'
			});

			this._responsiveImage.reflow();

			galleria.resize({
				width:imageWidth,
				height:windowHeight * 0.8
			});

			galleria.setOptions('thumbnails', true);
			galleria.setOptions('showImagenav', true);
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
			this._cardElement.css({
				width:'40%'
			});

			this._responsiveImage.reflow();

			galleria.resize({
				width:windowWidth * 0.4,
				height:this.minimizedImageHeight()
			});

			galleria.setOptions('thumbnails', false);
			galleria.setOptions('showImagenav', false);
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