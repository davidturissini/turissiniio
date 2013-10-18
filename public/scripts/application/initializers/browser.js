define(function (require) {

	var Backbone = require('backbone');
	var linkClick = require('element/observer/linkClick');
	var init = require('application/init');
	var routerFactory = require('application/router/factory');
	var jQuery = require('jQuery');
	var initialLoad = true;

	var router = routerFactory();
	var application;
	var currentInteractiveController = null;

	application = init();

	application.on('route:html:load', function (evt) {
		var route = evt.target;

		if (initialLoad === false) {
			jQuery('#content').html(evt.html);
			document.title = evt.data.title;
			jQuery('html').attr({
				class:evt.environment.bodyCSSClass
			});
			window.scrollTo(0, 0);
		} else {
			initialLoad = false;
		}

		require(
			['interactive/' + route.controller],

			function (interactiveController) {

				if (currentInteractiveController) {
					currentInteractiveController.unload();
				}

				interactiveController.load(evt.data);
				currentInteractiveController = interactiveController;
				
			}
		)

	});


	application.on('route:load', function (evt) {

		evt.routes.reverse().forEach(function (route) {
			var boundApplicationOnChange = application._onRouteChange.bind(application, route);
			router.route(route.path, '', boundApplicationOnChange);
			router.route(route.path + '/', '', boundApplicationOnChange);
	  	}.bind(this));


		linkClick(router);
		Backbone.history.start({
	    	pushState:true
	    });
	    
	});

	application.activate();

});