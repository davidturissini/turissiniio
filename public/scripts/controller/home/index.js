define(function (require) {

	var resourceFetch = require('resource/fetch');
	var FlickrImage = require('model/FlickrImage');

	return function (route, resourceConfig) {
		var resourcePath = 'trips';

		
		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			var posts = JSON.parse(e);

			posts.forEach(function (post) {

				post.widescreen_photo_url = function () {
					return function () {
						if (!post.photo_url) {
							return '';
						}

						var flickrImage = FlickrImage.fromUrl(post.photo_url);
						return flickrImage.url('b');
					}
				}
			});

			data.posts = posts;

			data.title = 'TravelAddict';

			return data;
		});



		return promise;

	}

});