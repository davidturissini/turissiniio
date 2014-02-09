

var FlickrImage = function (attributes) {
	this._attributes = attributes;
}

FlickrImage.prototype = {

	url: function (size) {
		size = size ? "_" + size : ""
		return "http://farm" + this._attributes.farm + ".static.flickr.com/" + this._attributes.server + "/" + this._attributes.id + "_" + this._attributes.secret + size + ".jpg"
	}

};


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


module.exports = FlickrImage;