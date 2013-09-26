define(
	'parallax/timeline',

	[
		'parallax/Parallax'
	],

	function (parallax) {
		var imageEl = document.querySelector('.hero .image');
		var pageHeaderEl = document.querySelector('.hero');
		var pageHeaderSubheadEl = document.querySelector('.hero .subhead');
		var firstChapterEl = document.querySelector('.chapter.first');
		var firstChapterTextEl = firstChapterEl.querySelector('.text');
		var firstChapterGalleryEl = firstChapterEl.querySelector('.gallery');
		var summitChapterEl = document.querySelector('.chapter.summit');
		var headerPhoto = document.querySelector('.container > article > .image .header');
		var summitPhoto = document.querySelector('.container > article > .image .summit');
		var firstChapterTextHeight = firstChapterTextEl.offsetHeight;
		var firstChapterContentHeight = document.querySelector('.chapter.first .content').offsetHeight;
		var firstChapterOffset = document.querySelector('.chapter.first').offsetTop;
		var windowHeight = window.innerHeight;
		var pageTitleElHeight = pageHeaderEl.offsetHeight;

		return function (currentScroll, callback) {

			window.requestAnimationFrame(function () {
				parallax(200, 0, 100, 1000, currentScroll, function (value) {
					pageHeaderEl.style.webkitTransform = 'translateY(' + value + 'px)';
				});

				parallax(120, 60, 100, 1000, currentScroll, function (value) {
					pageHeaderEl.style.height = value + 'px';
				});

				parallax(0, 1, 1600, 1000, currentScroll, function (value) {
					firstChapterEl.style.opacity = value;
				});

				parallax(90, 54, 3500, 1000, currentScroll, function (value) {
					firstChapterGalleryEl.style.width = value + '%';
				});

				parallax(50, 20, 3500, 1000, currentScroll, function (value) {
					firstChapterTextEl.style.left = value + '%';
				});

				parallax(0, -(firstChapterTextHeight - firstChapterContentHeight), 5000, 2000, currentScroll, function (value) {
					firstChapterTextEl.style.webkitTransform = 'translateY(' + value + 'px)';
				});

				parallax(0, -100, 7900, 1000, currentScroll, function (value) {
					firstChapterEl.style.webkitTransform = 'translateX(' + value + '%)';
				});

				callback();
			});

		};
	}
)