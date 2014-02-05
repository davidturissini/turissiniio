var Backbone = require('backbone');
var FlickrImage = require('./FlickrImage');


var Photo = Backbone.Model.extend({

	getUrl: function (size) {
		var flickrImage = new FlickrImage({
			farm:this.get('flickr_farm'),
			server:this.get('flickr_server'),
			id:this.get('flickr_id'),
			secret:this.get('flickr_secret')
		});
		
		return flickrImage.url(size);

	}

});



module.exports = Photo;