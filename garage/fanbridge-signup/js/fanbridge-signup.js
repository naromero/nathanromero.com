/**
 * This file contains global functions.
 *
 *
 */

/**
 * Fanbridge namespace.
 */
if (typeof(Fanbridge) == 'undefined')
{
	var Fanbridge = function() {};
}


Fanbridge.WordPress = {


	init: function() {
		if(!window.jQuery) {
			Fanbridge.WordPress.log('jQuery was not found.');
		}
		Fanbridge.WordPress.log('loaded');

	},

	submit: function() {

		

	},


	log: function (line) {
		if (window.console) {
			console.log(line);		
		}
	}

}

Fanbridge.WordPress.init();