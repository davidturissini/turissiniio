var FlickrImage = require('./FlickrImage');

function Photo (attributes) {
	this._attributes = attributes;
}

Photo.prototype = {
	getUrl: function (size) {
		var flickrImage = new FlickrImage({
			farm:this._attributes.flickr_farm,
			server:this._attributes.flickr_server,
			id:this._attributes.flickr_id,
			secret:this._attributes.flickr_secret
		});
		
		return flickrImage.url(size);

	}
}




module.exports = Photo;