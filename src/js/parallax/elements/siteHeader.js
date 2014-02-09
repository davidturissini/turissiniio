var jQuery = require('jQuery');
var calculateParallax = require('parallax/calculate');
var siteHeader = jQuery('#site-header');

var lastValue;
module.exports = function (scrollY) {

	calculateParallax(

        [{
            name:'y',
            from:0, 
            to:153, 
            scrollStart:0, 
            scrollDistance:191,
            fill:'both'
        }], 

        scrollY, 

        function (e) {
            siteHeader.css({
				transform:'translate3d(0, ' + e.props.y.value + 'px, 0)'
			});
        }

    );
};