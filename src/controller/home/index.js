define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route) {
		var promise = resourceFetch(ENV.traveladdict_service_url + 'posts');

		return promise.then(function (posts) {
			var posts = JSON.parse(posts);

			posts.forEach(function (post) {
				var photo = post.photo;


				if (photo) {
					post.hero_image = 'http://farm' + photo.flickr_farm + '.staticflickr.com/' + photo.flickr_server + '/' + photo.flickr_id + '_' + photo.flickr_secret + '_k.jpg';
				}
			});

			var data = {
				ogTitle:'title',
				ogDescription:'desc',
				title: 'turissini.io',
				posts:posts
			};

			return data;
		});


	}

});