var jQuery = require('jQuery');
var fetchPhoto = require('flickr/helper/fetchPhoto');


function viewImage(photo) {
	var src = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
	document.getElementById('hero').setAttribute('src', src);

	
}

module.exports = {
	load: function (data) {

		fetchPhoto('10989593716')
			.then(function (e) {
				//viewImage(e.photo);
			})

	},

	unload: function () {

	}
};