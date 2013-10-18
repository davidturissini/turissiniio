define(
	'router/fetch',

	[
		'jQuery'
	],

	function (jQuery) {

		var routesPath = '/config/routes';

		return function routesFetch () {

			var promise = jQuery.ajax({
				url:routesPath
			});

			return promise;
		};

	}
)