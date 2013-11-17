define(function (require) {

	var Q = require('q');
	var resourceFetch = require('resource/fetch');

	return function dataBuilder (route) {
		var resourcePath = null;
		var promise;
		var defer;

		defer = Q.defer();
		
		promise = defer.promise;

		resourceFetch('/config/restDomains.json')
			.then(function (restConfig) {
				require(
					['controller/' + route.controller],

					function (controller) {
						var controllerPromise = controller(route, JSON.parse(restConfig));

						if (typeof controllerPromise.then === 'function') {
							controllerPromise.then(defer.resolve.bind(defer));
						} else {

							defer.resolve(controllerPromise);
						}

					}
				);
			})


		

		return promise;

	}

});