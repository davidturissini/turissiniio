

	var jQuery = require('jQuery');

	module.exports = function () {

		return jQuery.ajax({
			url:'http://api.flickr.com/services/rest/',
			data: {
				api_key:'951c0814caade8b4fc2b381778269126',
				user_id:'58487569@N06',
				method:'flickr.photosets.getList',
				format:'json'
			},
			dataType:'jsonp',
			jsonpCallback:'jsonFlickrApi'
		});

	};