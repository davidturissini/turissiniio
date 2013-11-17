define(function (require) {

	function ResponsiveImage (element, options) {
		this._element = element;
		this.options = options || {};
	};

	ResponsiveImage.prototype = {

		reflow: function () {
			this._element.css({
				height:'auto'
			});
			
			if (this._element.height() > this.options.maxHeight) {
				this._element.css({
					height:this.options.maxHeight + 'px'
				})
			}
		}

	};

	return ResponsiveImage;

});