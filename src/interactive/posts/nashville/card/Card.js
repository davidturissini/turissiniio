

	var Galleria = require('Galleria');
	var dimensions = require('element/responsive/windowDimensions');
	var jqBody = jQuery(document.body);
	var Q = require('q');
	var ResponsiveImage = require('element/layout/ResponsiveImage');
	var galleriaBuilder = require('interactive/posts/nashville/galleria/builder');

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
		_boundCollapse:null,

		minimizedImageHeight: function () {
			return this._minimizedImageHeight;
		},

		isExpanded: function () {
			return this._isExpanded;
		},

		expand: function (imageWidth, imageHeight) {
			var defer = Q.defer();
			var ratio = 531 / 800;
			

			this._isExpanded = true;
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

			jQuery('#blog-content').css({
				overflow:'auto'
			});

			this._resize = function () {
				
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

			galleriaBuilder(jQuery('.images', this._element), galleriaOptions, '../../vendor/galleria/themes/classic/galleria.classic.min.js')
			
			this._boundClickCollapse = function (e) {
				if (e.target !== this._element.get(0)) {
					return;
				}

				e.stopPropagation();
				this.collapse();
			}.bind(this);
			this._element.bind('click', this._boundClickCollapse);

			return defer.promise;

		},

		collapse: function () {
			var defer = Q.defer();
			var galleria = jQuery('.images', this._element).data('galleria');
			jqBody.css({
				overflow:'auto'
			});
			
			jQuery('#blog-content').css({
				overflow:'inherit'
			});
			
			this._element.unbind('click', this._boundClickCollapse);
			this._boundClickCollapse = null;

			this._element.removeClass('expanded');
			jQuery(window).off('resize', this._resize);

			if(galleria && typeof galleria.destroy === 'function') {
				galleria.destroy();
			}


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

	module.exports = Card;
