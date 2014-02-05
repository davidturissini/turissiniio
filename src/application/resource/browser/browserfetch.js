var Q = require('q');
var jQuery = require('jquery');


function browserFetch (defer, path) {

	jQuery.ajax({
		url:path,
		dataType:'text'
	})

	.then(defer.resolve.bind(defer));
}


module.exports = function (path) {
	var defer = Q.defer();

    browserFetch(defer, path);

	return defer.promise;

}