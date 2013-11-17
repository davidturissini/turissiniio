define(function (require) {

	var Q = require('q');
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
