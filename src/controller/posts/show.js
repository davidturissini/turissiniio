define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route) {
		var resourcePath = 'posts/' + route.params.postSlug;

		var promise = resourceFetch(ENV.traveladdict_service_url + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.post = JSON.parse(e);

			data.post.hero_image = 'http://farm8.staticflickr.com/7395/11232485586_9a31f48487_b.jpg';
			data.title = data.post.title;


			return data;
		});



		return promise;

	}

});