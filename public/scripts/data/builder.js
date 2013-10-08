define(function (require) {

	var Q = require('Q');
	var resourceFetch = require('resource/fetch');
	var resourceDomain = 'http://localhost:3000/dave-and-melissa';

	return function dataBuilder (route) {
		var resourcePath;
		var promise;
		var defer;

		if (route.name === 'post:show') {
			resourcePath = '/trips/' + route.params.postSlug;
		}

		if (resourcePath) {
			promise = resourceFetch(resourceDomain + resourcePath)
				.then(function (e) {
					return JSON.parse(e);
				})
		} else {
			defer = Q.defer();
			defer.resolve();
			promise = defer.promise;
		}

		return promise;

	}

});