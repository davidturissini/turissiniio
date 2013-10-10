define(function (require) {


	return function (route, util) {
		var resourcePath = 'trips/' + route.params.postSlug;


		var promise = util.load(resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			data.post = JSON.parse(e);

			data.image_panorama_url = data.post.photo_url;

			return data;
		});



		return promise;

	}

});