define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route) {
		var resourcePath = 'posts/' + route.params.postSlug;

		var promise = resourceFetch(ENV.traveladdict_service_url + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			var flickrImage;
			data.post = JSON.parse(e);
			flickrImage = data.post.photo;

			data.post.hero_image = 'http://farm' + flickrImage.flickr_farm + '.staticflickr.com/' + flickrImage.flickr_server + '/' + flickrImage.flickr_id + '_' + flickrImage.flickr_secret + '_b.jpg';
			data.title = data.post.title + ' - turissini.io';
			data.post.facts = [{
				text:'The subway first started regular service in 1910.'
			},{
				text:'1.7 billion people rode the New York subway in 2012, the highest total since 1950.'
			},{
				text:'There are no subways that run directly from Queens to Brooklyn.'
			}];


			return data;
		});



		return promise;

	}

});