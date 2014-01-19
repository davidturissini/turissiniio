

	var resourceFetch = require('resource/fetch');
	var Q = require('q');
	var _ = require('underscore');

	module.exports = function (route) {
		var promises = [];
		promises.push(resourceFetch(ENV.traveladdict_service_url + 'posts'));
		promises.push(resourceFetch(ENV.traveladdict_service_url + 'locations'));

		var promise = Q.spread(promises, function (posts, locations) {

			var posts = JSON.parse(posts);
			var locations = JSON.parse(locations);
			var states = _.map(locations, function (location) {
				if (location.state !== '' && location.country.name === 'United States') {
					return location.state;
				}
			});

			states = _.compact(states);
			states = _.uniq(states);


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
				posts:posts,
				locations:locations,
				states:states
			};

			return data;
		});

		return promise;


	}