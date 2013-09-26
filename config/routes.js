(function () {
	var routes;
	var controllerRender;


	routes = function (app) {
		app.get('/summits', function (req, res) {
			controllerRender = require('./../app/controllers/summits/index').render;


			res.writeHead(200, { 'Content-Type': 'application/json' });
			controllerRender(req, res)

			.then(function () {
				res.end();
			});
			

		});


		app.get('/summits/highest_lowest', function (req, res) {

			controllerRender = require('./../app/controllers/summits/highest_lowest').render;


			res.writeHead(200, { 'Content-Type': 'application/json' });
			controllerRender(req, res)

			.then(function () {
				res.end();
			});


		});

	}

	

	exports.routes = routes;


}());