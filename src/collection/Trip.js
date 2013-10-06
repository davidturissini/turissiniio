define(
	'collection/Trip',

	[
		'Backbone',
		'model/Trip'
	],

	function (Backbone, Trip) {
		var TripsCollection = Backbone.Collection.extend({
			model:Trip
		});


		return TripsCollection;

	}
)