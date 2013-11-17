define(function (require) {


	var Backbone = require('backbone');


	var FlickrImage = Backbone.Model.extend({

		url: function (size) {
			size = size ? "_" + size : ""
			return "http://farm" + this.get("farm") + ".static.flickr.com/" + this.get("server") + "/" + this.get("id") + "_" + this.get("secret") + size + ".jpg"
		}

	});


	FlickrImage.fromUrl = function (url) {
		var str = url;
		var split;
		var attributes = {};
		str = str.replace('http://', '');

		split = str.split('/');

		attributes.farm = split[0].split('.')[0].replace('farm', '');
		attributes.server = split[1];
		attributes.id = split[2].split('_')[0];
		attributes.secret = split[2].split('_')[1].replace('.jpg', '');

		return new FlickrImage(attributes);
		
	};


	return FlickrImage


});