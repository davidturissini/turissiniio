define(
	'html/fetch',

	[
		'jQuery',
		'Q'
	],

	function (jQuery, Q) {
		var isInitialLoad = true;
		var cache = {};
		
		return function fetch (path) {
			var promise;

			if (isInitialLoad === true) {
				isInitialLoad = false;
				cache[path] = jQuery('#content').html();
			}

			if (typeof cache[path] === 'string') {
				var defer = Q.defer();
				defer.resolve(cache[path]);
				return defer.promise;
			}
			
			promise = jQuery.ajax({
				url:path + '?' + new Date().getTime()
			});


			promise = promise.then(function (e) {
				cache[path] = e;

				return e;
			});


			return promise;

		}

	}
)