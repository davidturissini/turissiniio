define(
	'model/Trip',

	[
		'Backbone',
		'collection/Location',
		'config'
	],

	function (Backbone, LocationsCollection, config) {

		var Trip = Backbone.Model.extend({

			initialize: function () {
				this._locations = new LocationsCollection();
			},

			validate:function (attributes) {
				if( !attributes.title ) {
					return {title:true};
				}
			},

			url:function () {
				return config.api.domain + '/dave-and-melissa/trips/' + this.get('slug');
			}

		});


		return Trip;

	}
)