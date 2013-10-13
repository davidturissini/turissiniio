define(function (require) {

	var Q = require('Q');
	var request = require('request');

	return function (path) {
		var defer = Q.defer();

		request(path, function (err, data) {
			defer.resolve(data.body, data);
		});

		return defer.promise;
	}

});