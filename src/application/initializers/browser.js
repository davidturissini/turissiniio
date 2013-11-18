define(function (require) {

	var Q = require('q');
	var Backbone = require('backbone');
	var linkClick = require('element/observer/linkClick');
	var init = require('application/init');
	var routerFactory = require('application/router/factory');
	var jQuery = require('jQuery');
	var initialLoad = true;
	var previousClassName = '';

	var router = routerFactory();
	var application;
	var currentInteractiveController = null;
	jQuery('html').addClass('mobile');
	var contentEl = jQuery('#content');
	var htmlEl = jQuery('html');

	application = init();

	application.on('route:change', function () {
		if (htmlEl.hasClass('loading') === false) {
			htmlEl.addClass('loading fixed-full');
		}
	});

	application.on('route:html:load', function (evt) {
		var route = evt.target;
		var className;

		if (initialLoad === false) {
			
			_gaq.push(['_setAccount', 'UA-31293401-2']);
        	_gaq.push(['_trackPageview', '/' + evt.target.path]);

			document.title = evt.data.title;
			jQuery('html').removeClass(previousClassName);
			jQuery('html').addClass(evt.environment.bodyCSSClass);
			previousClassName = evt.environment.bodyCSSClass;
			window.scrollTo(0, 0);
		} else {
			
			initialLoad = false;
		}

		require(
			['interactive/' + route.controller],

			function (interactiveController) {
				var defer = Q.defer();
				var promise;

				var html = jQuery('<div></div>');
				html.html(evt.html);
				if (currentInteractiveController && typeof currentInteractiveController.unload === 'function') {
					currentInteractiveController.unload();
				}

				defer.resolve();
				
				promise = defer.promise;

				promise = promise.then(function () {
					return interactiveController.load(evt.data, html);
				});
				
				promise = promise.then(function () {
					
					contentEl.empty().append(html.children());

					if (currentInteractiveController && typeof currentInteractiveController.afterRemove === 'function') {
						currentInteractiveController.afterRemove();
					}

					if (typeof interactiveController.afterAppend === 'function') {
						return interactiveController.afterAppend(evt.data, contentEl);
					}

				});

				promise = promise.then(function () {
					if (htmlEl.hasClass('loading') === true) {
						htmlEl.removeClass('loading fixed-full');
					}

					currentInteractiveController = interactiveController;

				});

				
				
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