(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('houdini', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.houdini = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var eventListeners = []; //Listeners array
	var settings, toggles;

	// Default settings
	var defaults = {
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-houdini',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the slide
	 * @private
	 * @param  {Element} content The content container the video is in
	 * @param  {String} activeClass The class asigned to expanded content areas
	 */
	var stopVideos = function ( content, activeClass ) {
		if ( !content.classList.contains( activeClass ) ) {
			var iframe = content.querySelector( 'iframe');
			var video = content.querySelector( 'video' );
			if ( iframe ) {
				var iframeSrc = iframe.src;
				iframe.src = iframeSrc;
			}
			if ( video ) {
				video.pause();
			}
		}
	};

	/**
	 * Close all content areas in an expand/collapse group
	 * @private
	 * @param  {Element} toggle The element that toggled the expand or collapse
	 * @param  {Object} settings
	 */
	var closeCollapseGroup = function ( toggle, settings ) {
		if ( !toggle.classList.contains( settings.toggleActiveClass ) && toggle.hasAttribute('data-group') ) {

			// Get all toggles in the group
			var groupName = toggle.getAttribute('data-group');
			var group = document.querySelectorAll('[data-group="' + groupName + '"]');

			// Deactivate each toggle and it's content area
			forEach(group, function (item) {
				var content = document.querySelector( item.getAttribute('data-collapse') );
				item.classList.remove( settings.toggleActiveClass );
				content.classList.remove( settings.contentActiveClass );
			});

		}
	};

	/**
	 * Toggle the collapse/expand widget
	 * @public
	 * @param  {Element} toggle The element that toggled the expand or collapse
	 * @param  {String} contentID The ID of the content area to expand or collapse
	 * @param  {Object} options
	 * @param  {Event} event
	 */
	exports.toggleContent = function (toggle, contentID, options, event) {

		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var content = document.querySelector(contentID); // Get content area

		// If toggle is a link, prevent default click event
		if ( toggle && toggle.tagName.toLowerCase() === 'a' && event ) {
			event.preventDefault();
		}

		settings.callbackBefore( toggle, contentID ); // Run callbacks before toggling content

		// Toggle collapse element
		closeCollapseGroup(toggle, settings); // Close collapse group items
		toggle.classList.toggle( settings.toggleActiveClass );// Change text on collapse toggle
		content.classList.toggle( settings.contentActiveClass ); // Collapse or expand content area
		stopVideos( content, settings.contentActiveClass ); // If content area is closed, stop playing any videos

		settings.callbackAfter( toggle, contentID ); // Run callbacks after toggling content

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	exports.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		if ( toggles ) {
			forEach( toggles, function ( toggle, index ) {
				toggle.removeEventListener( 'click', eventListeners[index], false );
			});
			eventListeners = [];
		}
		settings = null;
		toggles = null;
	};

	/**
	 * Initialize Houdini
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		exports.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		toggles = document.querySelectorAll('[data-collapse]'); // Get all collapse toggles

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Whenever a toggle is clicked, run the expand/collapse function
		forEach(toggles, function (toggle, index) {
			eventListeners[index] = exports.toggleContent.bind( null, toggle, toggle.getAttribute('data-collapse'), settings );
			toggle.addEventListener('click', eventListeners[index], false);
		});

	};


	//
	// Public APIs
	//

	return exports;

});