define(
	'main',

	[
		'jQuery',
		'mustache',
		'model/Trip'
	], 

	function (jQuery, Mustache, Trip) {
		var trip = new Trip({slug:'new-york'});
		
		trip.fetch()

		.then(function (e) {
			var htmlString = '<div>{{slug}}</div>';
			console.log(Mustache.render(htmlString, trip.attributes))


		})

	}

);