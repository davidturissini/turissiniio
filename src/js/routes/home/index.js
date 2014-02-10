var pigeon = require('pigeon');
var Q = require('q');
var transparency = require('transparency');
var everytrail = require('./../../services/everytrail');
var traveladdict = require('./../../services/traveladdict');
var _ = require('underscore');
var Photo = require('./../../model/Photo');



exports.template = '/html/views/home/index.html';

exports.action = function (document, routeData) {
	var promises = [];
	promises.push(traveladdict.get('posts'));
	promises.push(traveladdict.get('locations'));
	promises.push(everytrail.get('/api/user/trips', {user_id:'2185111', sort:'trip_date', limit:6}));

	document.title = 'Musings on travel, the outdoors, and life - turissini.io';

	return Q.spread(promises, function (posts, locations, trailsData) {
		
		var states = _.map(locations, function (location) {
			if (location.state !== '' && location.country.name === 'United States') {
				return location.state;
			}
		});

		
		states = _.compact(states);
		states = _.uniq(states);


		transparency.render(document.getElementById('travel-stats'), {
			'states-count':states.length
		});

		var postsSection = document.querySelector('.posts');
		var ul = postsSection.querySelector('ul');
		var li = ul.querySelector('.post');
		ul.removeChild(li);
		
		posts.forEach(function (post) {
			var clone = li.cloneNode(true);

			transparency.render(clone, post, {
				'image':{
					src:function (params) {
						var photo = new Photo(post.photo);
						return photo.getUrl('k');
					}
				},

				'post-link':{
					href:function (params) {
						return '/posts/' + post.slug;
					}
				}
			});

			ul.appendChild(clone);

		});

		var hikesSection = document.querySelector('.hikes');
		var hikesUl = hikesSection.querySelector('ul');
		var hikesLi = hikesUl.querySelector('li');
		hikesUl.removeChild(hikesLi);
		trailsData.forEach(function (hike) {
			var clone = hikesLi.cloneNode(true);
			transparency.render(clone, hike, {
				'hike-link':{
					href: function (params) {
						return 'http://www.everytrail.com/view_trip.php?trip_id=' + this.id;
					}
				}
			});

			hikesUl.appendChild(clone);
		});

		document.querySelector('html').className = 'home';


	});
}