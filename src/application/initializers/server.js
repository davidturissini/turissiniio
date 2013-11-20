var require = require('requirejs');
require.config({
	baseUrl:'./src/',
	paths:{
		'resource':'application/resource/server/'
	}
});

var express = require('express');
var Mustache = require('mustache');
var Q = require('q');
var init = require('application/init');
var resourceFetch = require('resource/fetch');
var _ = require('underscore');


var port = process.env.PORT || 8888;
var app = express();

app.use(express.static(__dirname + '/../../../public'));

application = init();

application.on('route:html:load', function (evt) {
	var route = evt.target;
	var htmlString = evt.html;
	var req = evt.request;
	var res = evt.response;
	var data = evt.data;

	if (route.layout !== false) {

		resourceFetch('/html/layout/main.html')
			.then(function (layout) {
				var mustacheObject = _.extend({
					html:htmlString,
					bodyCSSClass:evt.environment.bodyCSSClass
				}, data);

				var renderedTemplate = Mustache.render(layout, mustacheObject);

				res.send(renderedTemplate);
				res.end();
			})

	} else {
		res.send(htmlString);
		res.end();
	}


});

application.on('route:load', function (evt) {

	evt.routes.forEach(function (route) {
		app.get('/' + route.path, application._onRouteChange.bind(application, route));
  	});


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
