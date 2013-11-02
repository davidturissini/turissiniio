define(function (require) {

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var jqBody = jQuery(document.body);

	function Card (id, el, options) {
		this._element = el;
		this.id = id;
		this._cardElement = jQuery('.card', this._element);
		this._headerElement = jQuery('.header', this._element);
		this._isExpanded = false;
	};


	var proto = Card.prototype = {

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
			var horizMargin;
			var vertMargin;

			this._isExpanded = true;
			this._imageWidth = imageWidth;
			jqBody.css({
				overflow:'hidden'
			});

			this._element.addClass('expanded');

			this._headerElement.css({
				height:imageHeight + 'px'
			});

			this._cardElement.addClass('use-transition');
			
			horizMargin = this.__horizDistance();
			vertMargin = this.__vertDistance();
			this._cardElement.one('transitionend', function () {
				this._cardElement.removeClass('use-transition');
				this._cardElement.css({
					transform:'translateY(0) translateX(0)',
					margin:vertMargin + 'px auto'
				})
			}.bind(this));

			
			this._cardElement.css({
				width:imageWidth + 'px',
				transform:'translateY(' + vertMargin + 'px) translateX(' + horizMargin + 'px)'
			});

		},

		collapse: function () {
			jqBody.css({
				overflow:'auto'
			});

			this._cardElement.css({
				margin:this.__vertDistance() + 'px ' + this.__horizDistance() + 'px',
				width:this._imageWidth + 'px',
				transform:'translateY(' + this.__vertDistance() + 'px) translateX(' + this.__horizDistance() + 'px)'
			});

			this._cardElement.addClass('use-transition');
			this._element.removeClass('expanded');
			

			this._cardElement.one('transitionend', function () {
				this._cardElement.removeClass('use-transition');
				this._cardElement.css({
					transform:'translateY(0) translateX(0)',
					margin:0
				})

				this._isExpanded = false;
			}.bind(this));

			this._cardElement.css({
				width:'40%',
				transform:'translateY(' + (-this.__vertDistance()) + 'px) translateX(' + (-this.__horizDistance()) + 'px)',
			});

			this._headerElement.css({
				height:'70%'
			});
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