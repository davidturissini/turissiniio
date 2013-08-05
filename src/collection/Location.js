define(
	'collection/Location',

	[
		'Backbone',
		'model/Location'
	],

	function (Backbone, Location) {
		var LocationsCollection = Backbone.Collection.extend({
			model:Location
		});


		return LocationsCollection;

	}
)