define(function (require) {

	var Backbone = require('backbone');
	var linkClick = require('element/observer/linkClick');
	var init = require('application/init');
	var routerFactory = require('application/router/factory');
	var jQuery = require('jQuery');
	var initialLoad = true;

	var router = routerFactory();
	var application;

	application = init({
		router:router
	});

	application.on('route:html:load', function (evt) {
		if (initialLoad === true) {
			initialLoad = false;
			return;
		}

		jQuery('#content').html(evt.data.html);
		document.title = evt.data.title;
		document.body.className = evt.data.bodyCSSClass;
	});


	application.on('route:load', function (evt) {

		linkClick(router);
		Backbone.history.start({
	    	pushState:true
	    });
	    
	});

	application.activate();

});