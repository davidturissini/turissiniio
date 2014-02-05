var express = require('express');
var Mustache = require('mustache');
var Q = require('q');
var resourceFetch = require('./../resource/fetch');
var _ = require('underscore');
var Application = require('./../Application');


var port = process.env.PORT || 8888;
var app = express();

global.ENV = {
	traveladdict_service_url:'http://local.traveladdict.me:3000/dave-and-melissa/'//process.env['TRAVELADDICT_SERVICE_URL']
}

app.use(express.static(__dirname + '/../../../public'));

var application = new Application({

	htmlLoad: function (evt) {
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

					mustacheObject.environment = JSON.stringify(ENV);

					var renderedTemplate = Mustache.render(layout, mustacheObject);

					res.send(renderedTemplate);
					res.end();
				})

		} else {
			res.send(htmlString);
			res.end();
		}
	},

	connectRoutes: function (evt) {
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
	}

});




application.activate();



app.listen(port);
console.log('Listening on port ' + port);
