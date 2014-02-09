var transparency = require('transparency');
var Photo = require('./../../model/Photo');
var traveladdict = require('./../../services/traveladdict');

var action = function (document, routeData) {

	return traveladdict.get('posts/' + routeData.post_id)
		.then(function (postData) {
			var post = JSON.parse(postData);
			var element = document.querySelector('#blog-content');
			var photo = new Photo(post.photo);
			var factsSection = document.querySelector('#facts');
			var factEl;
			var facts;

			if(factsSection) {
				factEl = factsSection.querySelector('.fact');
				facts = factEl.parentNode;
				facts.removeChild(factEl);
			}

			document.title = post.title + ' - turissini.io';

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

			if (post.facts.length > 0) {

				post.facts.forEach(function (fact) {
					var clone = factEl.cloneNode(true);
					transparency.render(clone, fact);
					facts.appendChild(clone);
				});

			} else if(factsSection) {
				factsSection.parentNode.removeChild(factsSection);
			}

			document.querySelector('html').className = 'post-show';


		});
};

exports.template = '/html/views/posts/show.html';

exports.action = action;