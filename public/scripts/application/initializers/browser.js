define(function (require) {

	var Backbone = require('backbone');
	var linkClick = require('element/observer/linkClick');
	var main = require('main');
	var routerFactory = require('router/factory');
	var jQuery = require('jQuery');
	var initialLoad = true;

	var router = routerFactory();
	var application;

	application = main({
		router:router
	});

	application.on('route:html:load', function (evt) {
		if (initialLoad === true) {
			initialLoad = false;
			return;
		}

		jQuery('#content').html(evt.data.html);
		document.title = evt.data.title;
	});


	application.on('route:load', function (evt) {

		linkClick(router);
		Backbone.history.start({
	    	pushState:true
	    });
	    
	});

	application.activate();

});