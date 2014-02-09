

	var resourceFetch = require('resource/fetch');

	module.exports = function (route) {
		var resourcePath = '/trips/nashville-tennessee-north-carolina-fall-road-trip/locations/' + route.params.locationSlug;
		var promise = resourceFetch(ENV.traveladdict_service_url + resourcePath);


		promise = promise.then(function (e) {
			var data = {};
			var location = JSON.parse(e);
			var body = '';
			var photo = location.photos[0];
			// nashville
			switch (route.params.locationSlug) {


			case 'nashville-tennessee':
				photo = location.photos[18];
				break;
			case 'lynchburg-tennessee':
				photo = location.photos[9];
				break;
			case 'lookout-mountain-georgie':
				photo = location.photos[0];
				break;
			case 'great-smokey-mountains-national-park':
				photo = location.photos[6];
				break;
			case 'mount-pisgah-north-carolina':
				photo = location.photos[2];
				break;
			case 'grandfather-mountain-north-carolina':
				photo = location.photos[0];
				break;
			case 'blue-ridge-parkway':
				photo = location.photos[11];
				break;
			case 'asheville-north-carolina':
				photo = location.photos[1];
				break;
			case 'grand-ole-opry-nashville-tennessee':
				photo = location.photos[0];
				break;
			}


			
			var heroImage = 'http://farm' + photo.flickr_farm + '.staticflickr.com/' + photo.flickr_server + '/' + photo.flickr_id + '_' + photo.flickr_secret + '_c.jpg';

			location.posts.forEach(function (post) {
				body += post.body;
			});

			data.post = {
				title:location.title,
				summary:'foo',
				body:body,
				hero_image:heroImage
			}

			data.image_panorama_url = data.post.photo_url;
			data.title = data.post.title;


			return data;
		});



		return promise;

	}