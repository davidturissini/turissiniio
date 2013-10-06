define(function (require) {

	var Backbone = require('backbone');
	var linkClick = require('element/observer/linkClick');
	var main = require('main');
	var routerFactory = require('router/factory');
	var jQuery = require('jQuery');

	var router = routerFactory();
	var application;

	application = main({
		router:router
	});

	application.on('route:html:load', function (evt) {

		jQuery('#content').html(evt.data);

	});

	application.on('route:load', function (evt) {
		Backbone.history.start({
	    	pushState:true
	    });

	    linkClick(router);
	});

	application.activate();

});