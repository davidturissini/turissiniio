var pigeon = require('pigeon');

var traveladdict_service_url = 'http://traveladdict.me/dave-and-melissa/';

exports.get = function (path, params) {
	return pigeon.get(traveladdict_service_url + path, params);
};