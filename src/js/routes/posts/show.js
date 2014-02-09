var transparency = require('transparency');
var Photo = require('./../../model/Photo');
var traveladdict = require('./../../services/traveladdict');

var action = function (document, routeData) {

	return traveladdict.get('posts/' + routeData.post_id)
		.then(function (postData) {
			var post = JSON.parse(postData);
			var element = document.querySelector('#blog-content');
			var photo = new Photo(post.photo);
			var factEl = document.querySelector('#blog-content .fact');
			var facts = factEl.parentNode;
			facts.removeChild(factEl);

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

			post.facts.forEach(function (fact) {
				var clone = factEl.cloneNode(true);
				transparency.render(clone, fact);
				facts.appendChild(clone);
			});

			document.querySelector('html').className = 'post-show';


		});
};

exports.template = '/html/views/posts/show.html';

exports.action = action;