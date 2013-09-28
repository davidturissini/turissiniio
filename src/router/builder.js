define(
	'router/builder',

	[
		'jQuery',
		'Backbone'
		
	],

	function (jQuery, Backbone, Layout) {

		

		var Router = Backbone.Router.extend({

			routes: {

				'' : 'home',
				'post/:postSlug/' : 'postShow'

			}

		});

		return function () {
		    return new Router();
		}

	}
);