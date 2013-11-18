define(function (require) {

	var Q = require('q');
	var fs = require('fs');

	function nodeJSFetch (defer, path) {
		var baseDir = './public';


		var fileContents = fs.readFile(baseDir + path, 'utf-8', function (err, data) {
			if (err) {
				defer.reject();
			} else {
				defer.resolve(data.toString());
			}

		});


	}

	return function (path) {
		var defer = Q.defer();

		nodeJSFetch(defer, path);

		return defer.promise;

	}

});
