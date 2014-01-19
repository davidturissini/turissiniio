

	var Q = require('q');
	var request = require('request');

	module.exports = function (path) {
		var defer = Q.defer();

		request(path, function (err, data) {
			defer.resolve(data.body, data);
		});

		return defer.promise;
	}