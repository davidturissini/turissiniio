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

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-31293401-2']);
	trackPageView();

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	exports.track = trackPageView;
}