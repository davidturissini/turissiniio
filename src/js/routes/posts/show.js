var transparency = require('transparency');
var Photo = require('./../../model/Photo');
var traveladdict = require('./../../services/traveladdict');
var _ = require('underscore');
var Q = require('q');

var action = function (document, routeData) {
	var promises = [];

	promises.push(traveladdict.get('posts/' + routeData.post_id));
	promises.push(traveladdict.get('posts', {limit:2, exclude:routeData.post_id}));

	return Q.spread(promises, function(post, suggestedPosts) {
			var element = document.querySelector('#blog-content');
			var photo = new Photo(post.photo);
			var factsSection = document.querySelector('#facts');
			

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

			var suggestedPostsSection = document.querySelector('#suggested .posts');
			transparency.render(suggestedPostsSection, _.map(suggestedPosts, function (post) {
				return {
					post:post
				};
			}), {

				'suggested-link':{
					href:function () {
						return '/posts/' + this.post.slug;
					}
				},

				'image':{
					src:function () {
						var photo = new Photo(this.post.photo);
						return photo.getUrl('k');
					}
				}

			});


			if (post.facts.length > 0) {
				transparency.render(factsSection, _.map(post.facts, function (fact) {
					return {
						fact:fact
					};
				}))
				

			} else {
				factsSection.parentNode.removeChild(factsSection);
			}

			document.querySelector('html').className = 'post-show';


		});
};

exports.template = '/html/views/posts/show.html';

exports.action = action;