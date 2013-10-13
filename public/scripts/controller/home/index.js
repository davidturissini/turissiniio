define(function (require) {


	return function (route, util) {
		var resourcePath = 'trips';


		var promise = util.load(resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.posts = JSON.parse(e);

			data.title = 'Home';

			return data;
		});



		return promise;

	}

});