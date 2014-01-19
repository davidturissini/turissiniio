
	var jQuery = require('jQuery');

	var defaultBehavior = 'replace';

	function navigate (router, e) {
		var behavior = e.currentTarget.getAttribute('data-behavior');
		var navigationOptions = {
			trigger:true
		}

		if (behavior === 'ignore') {
			return;
		}

		e.preventDefault();

		if (!behavior) {
			behavior = defaultBehavior;
		}

		navigationOptions[behavior] = true;
		
		router.navigate(e.currentTarget.getAttribute('href'), navigationOptions)
	}

	module.exports = function (router) {
		var boundNavigate = navigate.bind(undefined, router);
		jQuery(document).on('click', 'a:not([href^=http]), a:not([data-router="ignore"])', boundNavigate);
	}