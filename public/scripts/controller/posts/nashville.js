define(function (require) {

	var resourceFetch = require('resource/fetch');

	return function (route, resourceConfig) {
		var resourcePath = 'trips/nashville-tennessee-north-carolina-fall-road-trip';

		var promise = resourceFetch(resourceConfig.tripsDomain + resourcePath);

		var tripDistanceSegments = [73.2, 91, 169.7, 96.6, 92.1, 82.5, 294];

		var tripDistance = 0;

		tripDistanceSegments.forEach(function (distance) {
			tripDistance += distance;
		});


		promise = promise.then(function (e) {
			var trip = JSON.parse(e);
			var data = {
				trip: trip,
				tripDistance: tripDistance,
				numLocations: trip.locations.length,
				numStates: 3,
				tripDistanceSegments: tripDistanceSegments
			};

			// nashville
			trip.locations[0].initialPhoto = trip.locations[0].photos.splice(18, 1)[0];
			trip.locations[0].facts = [{
				text:'Population: 624,496'
			},{
				text:'Nickname: Music City'
			},{
				text:'Demonym: Nashvillians'
			},{
				text:'Tennessee State Capital'
			},{
				text:'After drinking a cup of local coffee in Nashville, U.S. president Teddy Roosevelt coined the phrase "good to the last drop!"'
			}];

			// lynchburg
			trip.locations[1].initialPhoto = trip.locations[1].photos.splice(9, 1)[0];
			trip.locations[1].facts = [{
				text:'Population: 5,740'
			},{
				text:'Median cost of a home is less than $100,000'
			},{
				text:'Lynchburg is in a dry county, meaning you cannot buy alcohol anywhere in the county. It is legal, however, to drink alcohol in the county.'
			}];

			//lookout mountain
			trip.locations[2].initialPhoto = trip.locations[2].photos.splice(0, 1)[0];
			trip.locations[2].facts = [{
				text:'Elevation: 2,389 ft'
			},{
				text:'Highest point in Walker County, Georgia'
			},{
				text:'The mountain is the site of the Battle of Lookout Mountain during the Civil War. The battle is nicknamed the "Battle Above the Clouds", a reference to the unique way fog settles around the mountain.'
			}];

			//smokey mountains
			trip.locations[3].initialPhoto = trip.locations[3].photos.splice(6, 1)[0];
			trip.locations[3].facts = [{
				text:'Area: 522,419 acres'
			},{
				text:'Annual Visitors: 9,008,830'
			},{
				text:'Most visited national park in the United States'
			},{
				text:'UNESCO World Heritage Site'
			}];

			//pisgah inn
			trip.locations[4].initialPhoto = trip.locations[4].photos.splice(2, 1)[0];
			trip.locations[4].facts = [{
				text:'Elevation: 5,721 ft'
			},{
				text:'Atop of mountain is the highest television antenna east of the Mississippi River (6,023 ft)'
			}];

			//grandfather mountain
			trip.locations[5].initialPhoto = trip.locations[5].photos.splice(0, 1)[0];
			trip.locations[5].facts = [{
				text:'Elevation: 5,946 ft'
			},{
				text:'Four peaks are located on the mountain\s main ridge: Calloway Peak (5,964 ft.), Attic Window Peak (5,949 ft.), MacRae Peak (5,844 ft.), and Linville Peak (5,295 ft.)'
			},{
				text:'Part of Forrest Gump was filmed on the road to the summit.'
			}];

			//blue ridge parkway
			trip.locations[6].initialPhoto = trip.locations[6].photos.splice(11, 1)[0];
			trip.locations[6].facts = [{
				text:'Road length: 469 miles'
			},{
				text:'Number of counties: 29 (2 States, North Carolina and Virginia)'
			},{
				text:'Connects Great Smokey Mountains National Park and Shenandoah National Park'
			},{
				text:'Annual number of visitors: over 17,000,000'
			}];

			//asheville
			trip.locations[7].initialPhoto = trip.locations[7].photos.splice(0, 1)[0];
			trip.locations[7].facts = [{
				text:'Population: 83,393'
			},{
				text:'Incorporated: 1797'
			},{
				text:'Demonym: Ashevillian'
			},{
				text:'County: Buncombe'
			}];

			//grand old opry
			trip.locations[8].initialPhoto = trip.locations[8].photos.splice(0, 1)[0];
			trip.locations[8].facts = [{
				text:'Longest running radio show in United States (88 years)'
			},{
				text:'Broadcast on 650/WSM, WSM website, Sirius-XM Radio'
			},{
				text:'First broadcast was November 28, 1925'
			},{
				text:'Show was performed in the Ryman Auditorium until 1974, where it was moved to the Gaylord Opryland Resort.'
			}];

			trip.locations.forEach(function (location, index) {
				if (index < 3 || index === trip.locations.length - 1) {
					location.position = 'right';
				} else {
					location.position = 'left';
				}
			});

			data.title = 'Trip report for Nashville, Tennessee and North Carolina Autumn';


			return data;
			
		});



		return promise;

	}

});