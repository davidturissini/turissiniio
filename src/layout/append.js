define(
	'layout/append',

	[
		'jQuery'
	],

	function (jQuery) {

		return function layoutAppend (html) {
			
			jQuery('#content').html(html);



		}

	}
)