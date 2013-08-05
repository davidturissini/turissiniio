define(
	'collection/Map',

	[
		'Backbone',
		'model/Map'
	],

	function (Backbone, Map) {
		var MapsCollection = Backbone.Collection.extend({
			model:Map
		})

		return MapsCollection;
	}
)