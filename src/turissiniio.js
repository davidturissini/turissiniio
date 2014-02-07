var stateless = require('stateless');
var staticDir = process.browser ? '' : __dirname;
var Q = require('q');
var pigeon = require('pigeon');
var _ = require('underscore');
var transparency = require('transparency');
var Photo = require('./model/Photo');
var jquery = require('jquery');
var nashville;
var everytrail = require('everytrail');
var everytrailApiKey = 'b4698addce8098c96300da620996c899';
var everytrailSecret = '03ff2a1c38a05a65';
var Backbone = require('backbone');
if(process.browser === true) {
	nashville = require('./interactive/posts/nashville');
}

var traveladdict_service_url = 'http://local.traveladdict.me:3000/dave-and-melissa/';
everytrail.configure({
	protocol:'http',
	domain:'www.everytrail.bytemagik.com',
	key:everytrailApiKey,
	secret:everytrailSecret
});

stateless
	
	.setPort(process.env.PORT || 8888)
	.setServerRoot(staticDir)
	.setLayoutsDirectory('/layouts')
	.setDefaultLayoutFile('main.html')

	.setRoutes([{

		path:"/",

		template:staticDir + '/views/home/index.html',
		
		action:function (document, routeData) {
			var promises = [];
			promises.push(pigeon.get(traveladdict_service_url + 'posts'));
			promises.push(pigeon.get(traveladdict_service_url + 'locations'));

			return Q.spread(promises, function (postsData, locationsData) {
				
				var posts = JSON.parse(postsData);
				var locations = JSON.parse(locationsData);
				var states = _.map(locations, function (location) {
					if (location.state !== '' && location.country.name === 'United States') {
						return location.state;
					}
				});

				
				states = _.compact(states);
				states = _.uniq(states);

				var ul = document.querySelector('.posts');
				var li = ul.querySelector('.post');
				ul.removeChild(li);
				
				posts.forEach(function (post) {
					var clone = li.cloneNode(true);

					transparency.render(clone, post, {
						'post-link':{
							href:function (params) {
								return '/posts/' + post.slug;
							}
						}
					});

					ul.appendChild(clone);

				});


			});

		},

		onLoad: function () {
			everytrail.get('/api/user/trips', {user_id:'2185111'})
				.then(function (u) {
					console.log(u);
				});

		},

		onUnload: function () {

		}

	},{

		path:"/posts/nashville-tennessee-north-carolina-fall-road-trip",

		template:staticDir + '/views/posts/nashville.html',

		action: function (document, routeData) {
			var resourcePath = 'trips/nashville-tennessee-north-carolina-fall-road-trip';

			
			var promise = pigeon.get(traveladdict_service_url + resourcePath);

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
				trip.locations[2].initialPhoto = trip.locations[2].photos.splice(2, 1)[0];
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
				trip.locations[7].initialPhoto = trip.locations[7].photos.splice(1, 1)[0];
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

				var tripLocationEl = document.querySelector('.trip-location');

				trip.locations.forEach(function (location) {
					var clone = tripLocationEl.cloneNode(true);

					clone.setAttribute('id', location.slug);
					clone.className += ' ' + location.position;
					transparency.render(clone, location, {
						title:{
							html:function (params) {
								return '<span>' + this.title + '</span>';
							}
						},
						posts:{
							body: {
								html:function () {
									return this.body;
								}
							}
						}
					});
					tripLocationEl.parentNode.appendChild(clone);

					var photoEl = clone.querySelector('.images img');
					var initialSrc = 'http://farm' + location.initialPhoto.flickr_farm + '.staticflickr.com/' + location.initialPhoto.flickr_server + '/' + location.initialPhoto.flickr_id + '_' + location.initialPhoto.flickr_secret + '_c.jpg';
					photoEl.setAttribute('src', initialSrc);

					location.photos.forEach(function (photo) {
						var clone = photoEl.cloneNode(true);
						var src = 'http://farm' + photo.flickr_farm + '.staticflickr.com/' + photo.flickr_server + '/' + photo.flickr_id + '_' + photo.flickr_secret + '_c.jpg';

						clone.setAttribute('src', src);
						photoEl.parentNode.insertBefore(clone, photoEl.nextSibling);

					});


				});

				tripLocationEl.parentNode.removeChild(tripLocationEl);

				
				document.title = 'Trip report for our fall road trip through Nashville, Tennessee and Blue Ridge Parkway, North Carolina - turissini.io';
				/*data.ogTitle = data.title.replace(' - turissini.io', '');
				data.ogDescription = data.description = 'Our first venture into the South outside of New Orleans. There is no better place to experience country music and no better time to experience the rich fall colors that blanket the region every October.';
				data.ogImage = 'http://farm3.staticflickr.com/2824/10505814516_5040c94c1c_b.jpg';
				return data;
				*/

				return data;
				
			}.bind(this));

			return promise;

		},

		onLoad: function (data) {
			jquery('html').addClass('posts-show-nashville');
			nashville.load(data, window.document);
			return nashville.afterAppend(data, window.document);
		},

		onUnload: function () {
			nashville.unload();
			nashville.afterRemove();
			jquery('html').removeClass('posts-show-nashville');
		}

	},{

		path:"/posts/:post_id",

		template:staticDir + '/views/posts/show.html',

		action: function (document, routeData) {

			return pigeon.get(traveladdict_service_url + 'posts/' + routeData.post_id)
				.then(function (postData) {
					var post = JSON.parse(postData);
					var element = document.querySelector('#blog-content');
					var photo = new Photo(post.photo);
					var factEl = document.querySelector('#blog-content .fact');
					var facts = factEl.parentNode;
					facts.removeChild(factEl);

					transparency.render(element, post, {
						'hero':{
							src: function () {
								return photo.getUrl('k');
							}
						},

						'publish-date':{
							text: function () {
								return post.publish_date;
							}
						},

						'body':{
							html:function (params) {
								return post.body;
							}
						}

					});

					post.facts.forEach(function (fact) {
						var clone = factEl.cloneNode(true);
						transparency.render(clone, fact);
						facts.appendChild(clone);
					});


				});

		}

	}])

	.activate();