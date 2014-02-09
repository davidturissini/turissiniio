var stateless = require('stateless');
var staticDir = process.browser ? '' : __dirname + '/../';
var googleAnalytics = require('./analytics/google');

var routes = [];
var routesMap = {
	'/':require('./routes/home/index'),
	'/posts/nashville-tennessee-north-carolina-fall-road-trip':require('./routes/posts/nashville'),
	'/posts/:post_id':require('./routes/posts/show')
};

var route;
for(var prop in routesMap) {
	if (routesMap.hasOwnProperty(prop)) {
		route = routesMap[prop];
		route.template = staticDir + route.template;
		route.path = prop;
		routes.push(route);
	}
}

stateless
	.setPort(process.env.PORT || 5000)
	.setServerRoot(staticDir)
	.setLayoutsDirectory('/html/layouts')
	.setDefaultLayoutFile('main.html')
	.setAnalytics(googleAnalytics)
	.setRoutes(routes)
	.activate();