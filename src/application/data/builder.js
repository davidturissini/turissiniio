var Q = require('q');
var resourceFetch = require('./../resource/fetch.js');

module.exports = function dataBuilder (route) {
	var resourcePath = null;
	var promise;
	var defer;

	defer = Q.defer();
	
	promise = defer.promise;

	var controller = require('./../../controller/' + route.controller);
	var controllerPromise = controller(route);

	if (typeof controllerPromise.then === 'function') {
		controllerPromise.then(defer.resolve.bind(defer));
	} else {

		defer.resolve(controllerPromise);
	}



	

	return promise;

}