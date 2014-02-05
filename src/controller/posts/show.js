var resourceFetch = require('./../../application/resource/fetch');
var Photo = require('./../../model/Photo');

module.exports = function (route) {
	var resourcePath = 'posts/' + route.params.postSlug;

	var promise = resourceFetch(ENV.traveladdict_service_url + resourcePath);


	promise = promise.then(function (e) {
		var data = {};
		var photo;
		data.post = JSON.parse(e);
		photo = new Photo(data.post.photo);

		data.post.hero_image = photo.getUrl('k');
		data.title = data.post.title + ' - turissini.io';
		data.ogTitle = data.title.replace(' - turissini.io', '');
		data.ogDescription = data.description = data.post.description;
		data.ogImage = data.post.hero_image;


		return data;
	});



	return promise;

}