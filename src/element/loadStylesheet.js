define(function (require) {

	var Q = require('q');
	var jQuery = require('jQuery');

	return function loadStylesheet (url) {
		var defer = Q.defer();
		var linkTag = document.createElement('link');
		linkTag.setAttribute('rel', 'stylesheet');
		linkTag.setAttribute('type', 'text/css');

		jQuery(linkTag).on('load', defer.resolve.bind(defer));
		linkTag.setAttribute('href', url);
		document.head.appendChild(linkTag);

		return defer.promise;
	};

});