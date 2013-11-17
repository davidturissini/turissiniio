define(function (require) {

	var jQuery = require('jQuery');
	window.images = {};

	window.serializeImages = function () {
		var array = [];
		jQuery('img.selected').each(function (index, el) {
			array.push(window.images[el.id]);
		})


		return array;
	}

	function loadPhotos (photosetId) {
		return jQuery.ajax({
			url:'http://api.flickr.com/services/rest/',
			data: {
				api_key:'951c0814caade8b4fc2b381778269126',
				user_id:'58487569@N06',
				method:'flickr.photosets.getPhotos',
				photoset_id:photosetId,
				format:'json'
			},
			dataType:'jsonp',
			jsonpCallback:'jsonFlickrApi'

		})
	};


	return {
		load: function (data) {
			/*
			jQuery.ajax({
				url:'http://api.flickr.com/services/rest/',
				data: {
					api_key:'951c0814caade8b4fc2b381778269126',
					user_id:'58487569@N06',
					method:'flickr.photosets.getList',
					format:'json'
				},
				dataType:'jsonp',
				jsonpCallback:'jsonFlickrApi',
				success:function (e) {
					var photoSets = e.photosets.photoset;

					photoSets.forEach(function (set) {
						var el = jQuery('<div></div>');

						el.text(set.title._content);

						jQuery(document.body).append(el);

						el.on('click', function () {
							loadPhotos(set.id)
								.then(function (e) {
									var photos = e.photoset.photo;
									console.log(photos)
									jQuery(document.body).empty();

									photos.forEach(function (photo, index) {
										var id = 'photo' + index;
										var img = jQuery('<img id="' + id + '" />');
										img.attr({
											src:'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'
										});

										img.css({
											width:'400px'
										});

										img.appendTo(document.body);
										window.images[id] = photo;

										img.on('click', function () {
											img.toggleClass('selected');
										});

									});



								})

						});

					});
				}
			})

			*/

		},

		unload: function () {

		}
	};

});