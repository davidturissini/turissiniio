define(
	'layout/loadLayoutAndAppend',

	[
		'layout/append',
		'html/fetch'
	],

	function (layoutAppend, htmlFetch) {
		var isInitialLoad = true;

		return function loadPathAndAppend(path) {
			var promise;
			

			promise = htmlFetch(path, {});

			if (isInitialLoad === false) {
				promise = promise.then(layoutAppend);
			}


			isInitialLoad = false;


			return promise;

		};

	}
)