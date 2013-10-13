define(function (require) {


	return function (route, util) {
		var resourcePath = '/';

		
		var promise = util.load(resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.about = JSON.parse(e);

			data.title = 'About';

			return data;
		});



		return promise;

	}

});