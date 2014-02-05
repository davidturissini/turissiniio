var stateless = require('stateless');
var staticDir = process.browser ? '' : __dirname;
var Q = require('q');
var pigeon = require('pigeon');
var _ = require('underscore');
var transparency = require('transparency');
var Photo = require('./model/Photo');

var traveladdict_service_url = 'http://local.traveladdict.me:3000/dave-and-melissa/';


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
			
		},

		onUnload: function () {

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