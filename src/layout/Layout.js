define(
	'layout/Layout',

	[
		'jQuery'
	],

	function (jQuery) {

		function Layout () {
			this._path = null;
			this._htmlString = null;
		};


		Layout.prototype = {

			getPath: function () {
				return this._path;
			},

			setPath: function (path) {
				this._path = path;
				return this;
			},

			loadHTMLString: function () {
				if (typeof this.getPath() !== 'string') {
					throw new TypeError('Cannot load layout, path is a string. Use setPath')
				}

				var promise = jQuery.ajax({
					url:this.getPath()
				});

				return promise;

			}

		};

		return Layout;

	}

);