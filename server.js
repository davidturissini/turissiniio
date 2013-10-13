var require = require('requirejs');
require.config({
	baseUrl:'./public/scripts/',
	paths:{
		'resource':'./../../src/resource'
	}
})


var express = require('express');
var Mustache = require('mustache');
var Q = require('Q');
var main = require('main');
var resourceFetch = require('resource/fetch');


var port = process.env.PORT || 8888;
var app = express();

app.use(express.static(__dirname + '/public'));

application = main({
	router:app,
	routerFormatter:function (routeName) {
		return '/' + routeName;
	}
});

application.on('route:html:load', function (evt) {
	var route = evt.target;
	var htmlString = evt.html;
	var req = evt.request;
	var res = evt.response;
	var data = evt.data;

	if (route.layout !== false) {
		resourceFetch('/html/layout/main.html')
			.then(function (layout) {
				
				var renderedTemplate = Mustache.render(layout, data);

				res.send(renderedTemplate);
				res.end();
			})

	} else {

		res.send(htmlString);
		res.end();
	}


});

application.on('route:load', function () {
	app.use(function (req, res) {

		Q.all([
			resourceFetch('/html/layout/main.html'),
			resourceFetch('/html/views/404.html')
		])

		.spread(function (layout, template) {
			var renderedTemplate = Mustache.render(layout, {content:template});

			res.send(renderedTemplate);
			res.end();
		});
		
	  	

	});
});



application.activate();



app.listen(port);
console.log('Listening on port ' + port);
