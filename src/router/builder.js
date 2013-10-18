define(
	'router/builder',

	[
		
		'Backbone',
		'router/fetch'
		
	],

	function (Backbone, routesFetch) {

		return function () {

			var promise = routesFetch();

			promise = promise.then(function (routes) {

				var routesObj = {};

				routes.forEach(function (route) {
					routesObj[route.path] = route.name
				});
				

				var Router = Backbone.Router.extend({
					routes: routesObj
				});


				return new Router();


			});

			return promise;

		}

	}
);