define(function (require) {
	var jQuery = require('jQuery');

	var defaultBehavior = 'replace';

	function navigate (router, e) {
		var behavior = e.target.getAttribute('data-behavior');
		var navigationOptions = {
			trigger:true
		}

		e.preventDefault();

		if (!behavior) {
			behavior = defaultBehavior;
		}

		navigationOptions[behavior] = true;
		
		router.navigate(e.target.getAttribute('href'), navigationOptions)
	}

	return function (router) {
		var boundNavigate = navigate.bind(undefined, router);
		jQuery(document).on('click', 'a:not([href^=http]), a:not([rel=nofollow])', boundNavigate);
	}


});