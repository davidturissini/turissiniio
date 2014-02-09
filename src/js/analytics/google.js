if (process.browser === true) {

	function trackPageView(path) {
		if (!/turissini\.io/.test(window.location.href)) {
			return;
		}

		var pageView = ['_trackPageview'];
		if (path) {
			pageView.push(path);
		}
		
		_gaq.push(pageView);

		
	};

	exports.track = trackPageView;
}