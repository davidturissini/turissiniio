(function () {
	var mongoose = require('mongoose');
	var fs = require('fs');
	var express = require('express');
	var express = require('express');
	var configRoutes = require('./config/routes').routes;


	var port = process.env.PORT || 8888;

	var app = express();

	app.configure(function () {

	  	app.use(express.static(__dirname + '/public'));
	  	
	  	// default html file (with any request)
		app.use(function (req, res) {
			var contents = fs.readFileSync(__dirname + '/public/index.html');
			res.send(contents.toString());
		});
	});

	configRoutes(app);
	app.listen(port);
	console.log('Listening on port ' + port);

}());