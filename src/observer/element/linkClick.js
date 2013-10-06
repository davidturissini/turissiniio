define(
	'observer/element/linkClick',

	[
		'jQuery'
	],


	function (jQuery) {
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
			
			jQuery('body').on('click', 'a', navigate.bind(undefined, router));
		}

	}
)