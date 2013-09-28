define(
	'layout/decorator/Cache',

	[
		'Q'
	],

	function (Q) {

		function Cache (parent) {
			this._parent = parent;
			this._cache = {};
		};

		Cache.prototype = {

			getPath: function () {
				return this._parent.getPath();
			},

			setPath: function (path) {
				this._parent.setPath(path);
				return this;
			},

			loadHTMLString: function () {
				var promise;
				var defer;
				var path = this.getPath();

				if (typeof this._cache[path] === 'string') {
					defer = Q.defer();
					defer.resolve(this._cache[path]);
					
					return defer.promise;
				}

				promise = this._parent.loadHTMLString();

				promise = promise.then(function (htmlString) {
					this._cache[path] = htmlString;

					return htmlString;

				}.bind(this));

				
				return promise;


			}

		};

		return Cache;

	}
);