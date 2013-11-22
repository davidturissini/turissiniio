define(function (require) {

	var Q = require('q');
	var resourceFetch = require('resource/fetch');

	return function dataBuilder (route) {
		var resourcePath = null;
		var promise;
		var defer;

		defer = Q.defer();
		
		promise = defer.promise;

		require(
			['controller/' + route.controller],

			function (controller) {
				var controllerPromise = controller(route);

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