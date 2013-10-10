define(function (require) {

	var Q = require('Q');
	var resourceFetch = require('resource/fetch');
	var resourceDomain = 'http://localhost:3000/dave-and-melissa/';

	return function dataBuilder (route) {
		var resourcePath = null;
		var promise;
		var defer;

		defer = Q.defer();
		
		promise = defer.promise;



		require(
			['controller/' + route.controller],

			function (controller) {
				var controllerPromise = controller(route, {
					load:function (path) {
						return resourceFetch(resourceDomain + path);
					}
				});

				if (typeof controllerPromise.then === 'function') {
					controllerPromise.then(defer.resolve.bind(defer));
				} else {

					defer.resolve(controllerPromise);
				}

			}
		);

		return promise;

	}

});