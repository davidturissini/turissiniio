define(
	'main',

	[
		'router/builder',
		'observer/element/linkClick',
		'collection/Trip',
		'Backbone',
		'html/builder'
	], 

	function (routerBuilder, linkClick, TripCollection, Backbone, htmlBuilder) {
		var promise = routerBuilder();
		

		promise = promise.then(function (router) {
			router.on('route', htmlBuilder);


			linkClick(router);
			

			Backbone.history.start({
		    	pushState:true
		    });
		});
		

	}

);