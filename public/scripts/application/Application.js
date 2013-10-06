define(function (require) {

	var _ = require('underscore');
	var Backbone = require('backbone');
	var routesLoad = require('routes/load');
	var htmlBuilder = require('html/builder');


	function getRoutes() {
		
		return routesLoad().then(function (resourceContents) {
			return JSON.parse(resourceContents);
		});

	};

	function Application (options) {
		options = options || {};
		this._router = options.router;
		this._routerFormatter = options.routerFormatter;
	};


	var proto = Application.prototype = _.extend({}, Backbone.Events);


	proto._onRouteChange = function (req, res) {

		application.trigger('route:change', {
			target:route,
			request:req,
			response:res
		});


		htmlBuilder(route)
			.then(function (htmlString) {
				application.trigger('route:html:load', {
					target:route,
					data:htmlString,
					request:req,
					response:res
				});
			});

		
	};


	proto.activate = function () {
		var application = this;
		var router = this._router;
		var routerFormatter = this._routerFormatter;
		var promise;

		promise = getRoutes();
		
		promise = promise.then(function (routes) {

			routes.forEach(function (route) {
				var routePath = routerFormatter ? routerFormatter(route.path) : route.path;

		  		router.get(routePath, this._onRouteChange.bind(this));
		  	});

		  	application.trigger('route:load');


		});

	};


	return Application;


});