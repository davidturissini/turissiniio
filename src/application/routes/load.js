var resourceFetch = require('./../resource/fetch');

module.exports = function () {
	var routesPath = '/config/routes.json';

	return resourceFetch(routesPath);
}