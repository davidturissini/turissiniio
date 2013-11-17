define(function (require) {

	var Galleria = require('Galleria');
	var dimensions = require('element/responsive/windowDimensions');
	var jqBody = jQuery(document.body);
	var Q = require('q');
	var ResponsiveImage = require('element/layout/ResponsiveImage');

	var galleriaOptions = {
		imagePosition:'center',
		imageCrop:false,
		thumbnailCrop:false,
		initialTransition:false,
		showCounter:false,
		debug:false
	};

	function Card (id, el, options) {
		this._element = el;
		this.id = id;
		this._cardElement = jQuery('.card', this._element);
		this._headerElement = jQuery('.header', this._element);
		this._isExpanded = false;

		this._minimizedImageHeight = jQuery('.image', this._element).height();
	};


	var proto = Card.prototype = {

		_resize:null,

		minimizedImageHeight: function () {
			return this._minimizedImageHeight;
		},

		isExpanded: function () {
			return this._isExpanded;
		},

		expand: function (imageWidth, imageHeight) {
			var defer = Q.defer();
			//var galleria = jQuery('.images', this._element).data('galleria');
			var ratio = 531 / 800;
			

			this._isExpanded = true;
			this._imageWidth = imageWidth;
			jqBody.css({
				overflow:'hidden'
			});

			this._element.addClass('expanded');
			var width = this._cardElement.width();
			var height = width * ratio;

			if (height > dimensions.windowHeight * 0.8) {
				height = dimensions.windowHeight * 0.8;
			}

			galleriaOptions.width = width;
			galleriaOptions.height = height;

			this._resize = function () {
				console.log('resize')
				this._cardElement.get(0).offsetHeight;
				var width = this._cardElement.width();
				var height = width * ratio;

				if (height > dimensions.windowHeight * 0.8) {
					height = dimensions.windowHeight * 0.8;
				}

				var galleria = jQuery('.images', this._element).data('galleria');

				window.setTimeout(function () {
					galleria.resize({
						width:width,
						height:height
					})
				}, 100);

			}.bind(this);
			jQuery(window).on('resize', this._resize);


			Galleria.run(jQuery('.images', this._element), galleriaOptions);


			return defer.promise;

		},

		collapse: function () {
			var defer = Q.defer();
			var galleria = jQuery('.images', this._element).data('galleria');
			jqBody.css({
				overflow:'auto'
			});
			

			this._element.removeClass('expanded');
			jQuery(window).off('resize', this._resize);


			galleria.destroy();


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