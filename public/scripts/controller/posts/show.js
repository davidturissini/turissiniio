define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips/' + route.params.postSlug;

		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.post = JSON.parse(e);

			data.image_panorama_url = data.post.photo_url;
			data.title = data.post.title;

			return data;
		});



		return promise;

	}

});