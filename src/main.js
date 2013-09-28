define(
	'main',

	[
		'router/builder',
		'observer/element/linkClick',
		'layout/loadLayoutAndAppend'
	], 

	function (routerBuilder, linkClick, loadLayoutAndAppend) {
		var router = routerBuilder();
		

		router.on('route:home', function () {
			loadLayoutAndAppend('/html/layout/main.html');
		});


		router.on('route:postShow', function () {
			loadLayoutAndAppend('/html/layout/parallaxMap.html');
		});


		linkClick(router);
		

		Backbone.history.start({
	    	pushState:true
	    });

	}

);