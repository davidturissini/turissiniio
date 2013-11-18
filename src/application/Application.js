define(function (require) {

	var Q = require('q');
	var Mustache = require('mustache');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var routesLoad = require('application/routes/load');
	var htmlBuilder = require('application/html/builder');
	var dataBuilder = require('application/data/builder');


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


	proto._onRouteChange = function (route, req, res) {
		var routeArgValues;
		var routeArgProps;

		if (req && req.params) {
			route.params = req.params;
		} else {
		
			route.params = {};
			routeArgValues = Array.prototype.slice.call(arguments, 1);
			routeArgProps = route.path.match(/:[a-zA-Z]+/g);
			
			if (routeArgProps) {
				routeArgProps.forEach(function (prop, index) {
					route.params[prop.replace(':', '')] = routeArgValues[index]; 
				});
			}
		}

		this.trigger('route:change', {
			target:route,
			request:req,
			response:res
		});

		Q.all([
			htmlBuilder(route),
			dataBuilder(route)
		])
		
		.spread(function (htmlString, data) {
			
			if (data) {
				htmlString = Mustache.render(htmlString, data);
			}

			this.trigger('route:html:load', {
				target:route,
				request:req,
				response:res,
				html:htmlString,
				environment:{
					bodyCSSClass:route.name.split(':').join('-')
				},
				data:data
			});

		}.bind(this));

		
	};


	proto.activate = function () {
		var router = this._router;
		var routerFormatter = this._routerFormatter;
		var promise;

		promise = getRoutes();
		
		promise = promise.then(function (routes) {
			this.trigger('route:load', {
				routes:routes
			});

		}.bind(this));

	};


	return Application;


});