define(
	'observer/element/linkClick',

	[
		'jQuery'
	],


	function (jQuery) {

		return function (router) {
			jQuery('body').on('click', 'a', function (e) {

				e.preventDefault();

				router.navigate(e.target.getAttribute('href'), {trigger:true, replace:true})
			});
		}

	}
)