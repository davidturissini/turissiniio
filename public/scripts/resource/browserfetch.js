define(function (require, exports, module) {var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1); var Q = require('Q');
	var Q = require('Q');
	var jQuery = require('jQuery');


	function browserFetch (defer, path) {

		jQuery.ajax({
			url:path,
			dataType:'text'
		})

		.then(defer.resolve.bind(defer));
	}


	return function (path) {
		var defer = Q.defer();

	    browserFetch(defer, path);

		return defer.promise;

	}
});
