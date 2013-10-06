define(function (require) {

	var Backbone = require('backbone');
	var router = new Backbone.Router();

	return function () {

		

		return {
			get: function (path, handler) {
				router.route(path, '', handler);
			},

			navigate: function () {
				router.navigate.apply(router, arguments);
			}
		}

	}

});