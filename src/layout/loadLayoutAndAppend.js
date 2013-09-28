define(
	'layout/loadLayoutAndAppend',

	[
		'layout/Layout',
		'layout/decorator/Cache'
	],

	function (Layout, LayoutDecoratorCache) {
		var currentPath;
		var layoutEl;

		var layout = new Layout();
		layout = new LayoutDecoratorCache(layout);
		

		return function loadPathAndAppend(path) {
			layout.setPath(path);

			var promise = layout.loadHTMLString(path);

			promise.then(function (e) {
				var html = jQuery(e);

				if (layoutEl && layoutEl.length === 1) {
					layoutEl.replaceWith(html);
					

				} else if (layoutEl) {
					jQuery(layoutEl.get(0)).replaceWith(html);
					layoutEl.remove();

				} else {
					html.prependTo(document.body);

				}

				layoutEl = html;

			});

			return promise;

		};

	}
)