/* =============================================================

	Better Adoption Forms v2.0
	Store and load data for better adoption forms, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('formSaver', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.formSaver = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener && !!root.localStorage; // Feature test
	var eventListeners = { //Listener arrays
		save: [],
		del: []
	};
	var settings, forms, saveBtns, deleteBtns, petNameField;

	// Default settings
	var defaults = {
		deleteClear: true,
		saveMessage: 'Saved!',
		deleteMessage: 'Deleted!',
		saveClass: '',
		deleteClass: '',
		initClass: 'js-form-saver',
		callbackBeforeSave: function () {},
		callbackAfterSave: function () {},
		callbackBeforeDelete: function () {},
		callbackAfterDelete: function () {},
		callbackBeforeLoad: function () {},
		callbackAfterLoad: function () {}
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
	 * Remove whitespace from a string
	 * @private
	 * @param {String} string
	 * @returns {String}
	 */
	var trim = function ( string ) {
		return string.replace(/^\s+|\s+$/g, '');
	};

	/**
	 * Convert data-options attribute into an object of key/value pairs
	 * @private
	 * @param {String} options Link-specific options as a data attribute string
	 * @returns {Object}
	 */
	var getDataOptions = function ( options ) {
		return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
	};

	/**
	 * Save form data to localStorage
	 * @public
	 * @param  {Element} btn Button that triggers form save
	 * @param  {Element} form The form to save
	 * @param  {Object} options
	 * @param  {Event} event
	 */
	exports.saveForm = function ( btn, formID, options, event ) {

		// Defaults and settings
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var overrides = getDataOptions( btn ? btn.getAttribute('data-options') : null );
		settings = extend( settings, overrides ); // Merge overrides with settings

		// Selectors and variables
		var form = document.querySelector(formID);
		var formSaverID = 'formSaver-' + form.className;
		var formSaverData = {};
		var formFields = form.elements;
		var formStatus = form.querySelectorAll('[data-form-status]');

		/**
		 * Convert field data into an array
		 * @private
		 * @param  {Element} field Form field to convert
		 */
		var prepareField = function (field) {
			if ( !field.hasAttribute('data-form-no-save') ) {
				if ( field.type.toLowerCase() === 'radio' || field.type.toLowerCase() === 'checkbox' ) {
					if ( field.checked === true ) {
						formSaverData[field.name + field.value] = 'on';
					}
				} else if ( field.type.toLowerCase() !== 'hidden' && field.type.toLowerCase() !== 'submit' ) {
					if ( field.value && field.value !== '' ) {
						formSaverData[field.name] = field.value;
					}
				}
			}
		};

		/**
		 * Display status message
		 * @private
		 * @param  {Element} status The element that displays the status message
		 * @param  {String} saveMessage The message to display on save
		 * @param  {String} saveClass The class to apply to the save message wrappers
		 */
		var displayStatus = function ( status, saveMessage, saveClass ) {
			status.innerHTML = saveClass === '' ? '<div>' + saveMessage + '</div>' : '<div class="' + saveClass + '">' + saveMessage + '</div>';
		};

		// If a link or button, prevent default click event
		if ( btn && (btn.tagName.toLowerCase() === 'a' || btn.tagName.toLowerCase() === 'button' ) && event ) {
			event.preventDefault();
		}

		settings.callbackBeforeSave( btn, form ); // Run callbacks before save

		// Add field data to array
		forEach(formFields, function (field) {
			prepareField(field);
		});

		// Display save success message
		forEach(formStatus, function (status) {
			displayStatus( status, settings.saveMessage, settings.saveClass );
		});

		// Save form data in localStorage
		localStorage.setItem( formSaverID, JSON.stringify(formSaverData) );

		settings.callbackAfterSave( btn, form ); // Run callbacks after save

	};

	/**
	 * Remove form data from localStorage
	 * @public
	 * @param  {Element} btn Button that triggers form delete
	 * @param  {Element} form The form to remove from localStorage
	 * @param  {Object} options
	 * @param  {Event} event
	 */
	exports.deleteForm = function ( btn, formID, options, event ) {

		// Defaults and settings
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var overrides = getDataOptions( btn ? btn.getAttribute('data-options') : null );
		settings = extend( settings, overrides ); // Merge overrides with settings

		// Selectors and variables
		var form = document.querySelector(formID);
		var formSaverID = 'formSaver-' + form.className;
		var formStatus = form.querySelectorAll('[data-form-status]');
		var formMessage = settings.deleteClass === '' ? '<div>' + settings.deleteMessage + '</div>' : '<div class="' + settings.deleteClass + '">' + settings.deleteMessage + '</div>';

		/**
		 * Display succes message
		 * @private
		 */
		var displayStatus = function () {
			if ( settings.deleteClear === true || settings.deleteClear === 'true' ) {
				sessionStorage.setItem(formSaverID + '-formSaverMessage', formMessage);
				location.reload(false);
			} else {
				forEach(formStatus, function (status) {
					status.innerHTML = formMessage;
				});
			}
		};

		// If a link or button, prevent default click event
		if ( btn && (btn.tagName.toLowerCase() === 'a' || btn.tagName.toLowerCase() === 'button' ) && event ) {
			event.preventDefault();
		}

		settings.callbackBeforeDelete( btn, form ); // Run callbacks before delete
		localStorage.removeItem(formSaverID); // Remove form data
		displayStatus(); // Display delete success message
		settings.callbackAfterDelete( btn, form ); // Run callbacks after delete

	};

	/**
	 * Load form data from localStorage
	 * @public
	 * @param  {Element} form The form to get data for
	 * @param  {Object} options
	 */
	exports.loadForm = function ( form, options ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var formSaverID = 'formSaver-' + form.className;
		var formSaverData = JSON.parse( localStorage.getItem(formSaverID) );
		var formFields = form.elements;
		var formStatus = form.querySelectorAll('[data-form-status]');

		/**
		 * Populate a field with localStorage data
		 * @private
		 * @param  {Element} field The field to get data form
		 */
		var populateField = function ( field ) {
			if ( formSaverData ) {
				if ( field.type.toLowerCase() === 'radio' || field.type.toLowerCase() === 'checkbox' ) {
					if ( formSaverData[field.name + field.value] === 'on' ) {
						field.checked = true;
					}
				} else if ( field.type.toLowerCase() !== 'hidden' && field.type.toLowerCase() !== 'submit' ) {
					if ( formSaverData[field.name] ) {
						field.value = formSaverData[field.name];
					}
				}
			}
		};

		/**
		 * Display success message
		 * @param  {Element} status The element that displays the status message
		 */
		var displayStatus = function ( status ) {
			status.innerHTML = sessionStorage.getItem(formSaverID + '-formSaverMessage');
			sessionStorage.removeItem(formSaverID + '-formSaverMessage');
		};

		settings.callbackBeforeLoad( form ); // Run callbacks before load

		// Populate form with data from localStorage
		forEach(formFields, function (field) {
			populateField(field);
		});

		// If page was reloaded and delete success message exists, display it
		forEach(formStatus, function (status) {
			displayStatus(status);
		});

		settings.callbackAfterLoad( form ); // Run callbacks after load

	};

	/**
	 * Save the name and id of the pet user is interested in adopting
	 */
	exports.savePetName = function () {

		// feature test
		if ( !supports ) return;

		// Pass the name of the dog the user is interested in adopting
		// from the "Our Dogs" page to the Adoption Form
		var adoptToggle = document.querySelectorAll('.adopt-toggle');
		forEach( adoptToggle, function ( toggle ) {
			toggle.addEventListener('click', function(e) {
				var name = toggle.getAttribute('data-name');
				sessionStorage.setItem('petToAdopt', name);
			}, false);
		});

	};

	/**
	 * Get the name and id of the pet user is interested in adopting from localStorage
	 * @param  {Element} petNameField The field for the pet's name
	 */
	var adoptionFormGetPet = function (petNameField) {
		var petName = sessionStorage.getItem('petToAdopt');
		petNameField.value = petName;
		sessionStorage.removeItem('petToAdopt');
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	exports.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		if ( saveBtns ) {
			forEach( saveBtns, function ( btn, index ) {
				btn.removeEventListener( 'click', eventListeners.save[index], false );
			});
			eventListeners.save = [];
		}
		if ( deleteBtns ) {
			forEach( deleteBtns, function ( btn, index ) {
				btn.removeEventListener( 'click', eventListeners.del[index], false );
			});
			eventListeners.del = [];
		}
		settings = null;
		forms = null;
		saveBtns = null;
		deleteBtns = null;
		petNameField = null;
	};

	/**
	 * Initialize Form Saver
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
		forms = document.forms;
		saveBtns = document.querySelectorAll('[data-form-save]');
		deleteBtns = document.querySelectorAll('[data-form-delete]');
		petNameField = document.querySelector('#input-dog-name');

		// Add class to HTML element to activate conditional CSS
		document.documentElement.className += (document.documentElement.className ? ' ' : '') + settings.initClass;

		// When a save button is clicked, save form data
		forEach(saveBtns, function (btn, index) {
			eventListeners.save[index] = exports.saveForm.bind( null, btn, btn.getAttribute('data-form-save'), settings );
			btn.addEventListener('click', eventListeners.save[index], false);
		});

		// When a delete button is clicked, delete form data
		forEach(deleteBtns, function (btn, index) {
			eventListeners.del[index] = exports.deleteForm.bind( null, btn, btn.getAttribute('data-form-delete'), settings );
			btn.addEventListener('click', eventListeners.del[index], false);
		});

		// Get saved form data on page load
		forEach(forms, function (form) {
			exports.loadForm( form, settings );
		});

		if ( petNameField ) {
			adoptionFormGetPet(petNameField);
		}

	};


	//
	// Public APIs
	//

	return exports;

});