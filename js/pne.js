/* =============================================================

	Buoy v1.2
	A simple vanilla JS micro-library by Chris Ferdinandi.
	http://gomakethings.com

	Class handlers by Todd Motto.
	https://github.com/toddmotto/apollo

	Module pattern by Keith Rousseau.
	https://twitter.com/keithtri

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.buoy = (function(){

	'use strict';

	// Check for classList support
	var classList = document.documentElement.classList;

	// Check if an element has a class
	var hasClass = function (elem, className) {
		if ( classList ) {
			return elem.classList.contains(className);
		} else {
			return new RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
		}
	};

	// Add a class to an element
	var addClass = function (elem, className) {
		if ( !hasClass(elem, className) ) {
			if ( classList ) {
				elem.classList.add(className);
			} else {
				elem.className += (elem.className ? ' ' : '') + className;
			}
		}
	};

	// Remove a class from an element
	var removeClass = function (elem, className) {
		if (hasClass(elem, className)) {
			if ( classList ) {
				elem.classList.remove(className);
			} else {
				elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
			}
		}
	};

	// Toggle a class on an element
	var toggleClass = function (elem, className) {
		if ( classList ) {
			elem.classList.toggle(className);
		} else {
			if ( hasClass(elem, className ) ) {
				removeClass(elem, className);
			}
			else {
				addClass(elem, className);
			}
		}
	};

	// Get siblings of an element
	var getSiblings = function (elem) {
		var siblings = [];
		var sibling = elem.parentNode.firstChild;
		var skipMe = elem;
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType == 1 && sibling != elem ) {
				siblings.push( sibling );
			}
		}
		return siblings;
	};

	// Return functions
	return {
		toggleClass: toggleClass,
		removeClass: removeClass,
		addClass: addClass,
		hasClass: hasClass,
		getSiblings: getSiblings
	};

})();





/* =============================================================

	Fluid Vids v2.0
	Fluid and responsive YouTube and Vimeo videos, by Todd Motto.
	https://github.com/toddmotto/fluidvids

	Licensed under MIT License.
	http://toddmotto.com/licensing

 * ============================================================= */

window.fluidvids = (function (window, document, undefined) {

	'use strict';

	// Constructor function
	var Fluidvids = function (elem) {
		this.elem = elem;
	};

	// Prototypal setup
	Fluidvids.prototype = {

		init : function () {

			var videoRatio = (this.elem.height / this.elem.width) * 100;
			this.elem.style.position = 'absolute';
			this.elem.style.top = '0';
			this.elem.style.left = '0';
			this.elem.width = '100%';
			this.elem.height = '100%';

			var wrap = document.createElement('div');
			wrap.className = 'fluidvids';
			wrap.style.width = '100%';
			wrap.style.position = 'relative';
			wrap.style.paddingTop = videoRatio + '%';

			var thisParent = this.elem.parentNode;
			thisParent.insertBefore(wrap, this.elem);
			wrap.appendChild(this.elem);

		}

	};

	// Initiate the plugin
	var iframes = document.getElementsByTagName( 'iframe' );

	for (var i = 0; i < iframes.length; i++) {
		var players = /www.youtube.com|player.vimeo.com|www.hulu.com|www.slideshare.net/;
		if (iframes[i].src.search(players) > 0) {
			new Fluidvids(iframes[i]).init();
		}
	}

})(window, document);





/* =============================================================

	Drop v2.3
	Simple, mobile-friendly dropdown menus by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to toggle dropdowns
		var toggleDrop = function (toggle) {

			// Define the dropdown menu content, parent element, and siblings
			var toggleMenu = toggle.nextElementSibling;
			var toggleParent = toggle.parentNode;
			var toggleSiblings = buoy.getSiblings(toggleParent);

			// Add/remove '.active' class from dropdown item
			buoy.toggleClass(toggle, 'active');
			buoy.toggleClass(toggleMenu, 'active');
			buoy.toggleClass(toggleParent, 'active');

			// Remove '.active' class from all sibling elements
			[].forEach.call(toggleSiblings, function (sibling) {
				var siblingContent = sibling.children;
				buoy.removeClass(sibling, 'active');

				// Remove '.active' class from all siblings child elements
				[].forEach.call(siblingContent, function (content) {
					buoy.removeClass(content, 'active');
				});

			});

		};

		// Function to close all dropdowns
		var closeDrops = function (dropToggle, dropWrapper, dropContent) {

			// For each dropdown toggle, remove '.active' class
			[].forEach.call(dropToggle, function (toggle) {
				buoy.removeClass(toggle, 'active');
			});

			// For each dropdown toggle, remove '.active' class
			[].forEach.call(dropWrapper, function (wrapper) {
				buoy.removeClass(wrapper, 'active');
			});

			// For each dropdown toggle, remove '.active' class
			[].forEach.call(dropContent, function (content) {
				buoy.removeClass(content, 'active');
			});

		};

		// Define the dropdown toggle element, wrapper and content
		var dropToggle = document.querySelectorAll('.dropdown > a');
		var dropWrapper = document.querySelectorAll('.dropdown');
		var dropContent = document.querySelectorAll('.dropdown-menu');


		// When body is clicked, close all dropdowns
		document.addEventListener('click', function(e) {

			// Close dropdowns
			closeDrops(dropToggle, dropWrapper, dropContent);

		}, false);


		// For each toggle
		[].forEach.call(dropToggle, function (toggle) {

			// When the toggle is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the "close all dropdowns" function
				e.stopPropagation();

				// Prevent default link action
				e.preventDefault();

				// Toggle dropdown menu
				toggleDrop(toggle);

			}, false);
		});


		// For each dropdown menu
		[].forEach.call(dropContent, function (content) {

			// When the menu is clicked
			content.addEventListener('click', function(e) {

				// Prevent the "close all dropdowns" function
				e.stopPropagation();

			}, false);
		});

	}

})();





/* =============================================================

	Astro v3.4
	Mobile-first navigation patterns by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to toggle navigation menu
		var toggleNav = function (toggle) {

			// Get target navigation menu
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Toggle the '.active' class on the menu
			buoy.toggleClass(dataTarget, 'active');

		};

		// Define the nav toggle
		var navToggle = document.querySelectorAll('.nav-toggle');

		// For each nav toggle
		[].forEach.call(navToggle, function (toggle) {

			// When nav toggle is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the default link behavior
				e.preventDefault();

				// Toggle the navigation menu
				toggleNav(toggle);

			}, false);
		});
	}

})();





/* =============================================================

	Houdini v3.4
	A simple collapse and expand widget by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to toggle collapse/expand widget
		var toggleCollapse = function (toggle) {

			// Define the content container
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Toggle the '.active' class on the toggle and container elements
			buoy.toggleClass(toggle, 'active');
			buoy.toggleClass(dataTarget, 'active');

		};

		// Define collapse toggle
		var collapseToggle = document.querySelectorAll('.collapse-toggle');

		// For each collapse toggle
		[].forEach.call(collapseToggle, function (toggle) {

			// When the toggle is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent default link behavior
				e.preventDefault();

				// Toggle the collapse/expand widget
				toggleCollapse(toggle);

			}, false);

		});

	}

})();





/* =============================================================

	Modals v2.2
	Simple modal dialogue pop-up windows by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to show modal
		var showModal = function (toggle) {

			// Define the modal
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// Define the modal background
			var modalBg = document.createElement('div');
			buoy.addClass(modalBg, 'modal-bg');

			// Activate the modal
			buoy.addClass(dataTarget, 'active');
			dataTarget.style.top = window.pageYOffset + 50 + 'px';
			document.body.appendChild(modalBg);

		};

		// Function to hide all modals
		var hideModals = function (modals, modalsBg) {

			// Hide all modals
			[].forEach.call(modals, function (modal) {
				buoy.removeClass(modal, 'active');
			});

			// Hide all modal backgrounds
			[].forEach.call(modalsBg, function (bg) {
				document.body.removeChild(bg);
			});

		};


		// Define modals, modal toggle, and modal close
		var modals = document.querySelectorAll('.modal');
		var modalToggle = document.querySelectorAll('.modal-toggle');
		var modalClose = document.querySelectorAll('.modal-close');


		// When body is clicked
		document.addEventListener('click', function() {

			// Hide all modals
			hideModals(modals, document.querySelectorAll('.modal-bg'));

		}, false);


		// When body is tapped
		document.addEventListener('touchstart', function() {

			// Hide all modals
			hideModals(modals, document.querySelectorAll('.modal-bg'));

		}, false);


		// For each modal toggle
		[].forEach.call(modalToggle, function (toggle) {

			// When the modal toggle is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the "close all modals" function
				e.stopPropagation();

				// Prevent the default link behavior
				e.preventDefault();

				// Show the modal
				showModal(toggle);

			}, false);

		});


		// For each modal close
		[].forEach.call(modalClose, function (close) {

			// When the modal toggle is clicked
			close.addEventListener('click', function(e) {

				// Prevent the default link behavior
				e.preventDefault();

				// Hide all modals
				hideModals(modals, document.querySelectorAll('.modal-bg'));

			}, false);

		});


		// For each modal window
		[].forEach.call(modals, function (modal) {

			// When the menu is clicked
			modal.addEventListener('click', function(e) {

				// Prevent the "close all dropdowns" function
				e.stopPropagation();

			}, false);

			// When the menu is tapped
			modal.addEventListener('touchstart', function(e) {

				// Prevent the "close all dropdowns" function
				e.stopPropagation();

			}, false);

		});


		// When key on keyboard is pressed
		window.addEventListener('keydown', function (e) {

			// If it's the esc key
			if (e.keyCode == 27) {

				// Hide all modals
				hideModals(modals, document.querySelectorAll('.modal-bg'));

			}

		}, false);

	}

})();





/* =============================================================

	Petfinder Sort v2.0
	Filter PetFinder results by a variety of categories, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Variables
		var pets = document.querySelectorAll('.pf');
		var petFilterBreeds = document.querySelectorAll('.pf-breeds');
		var petFilterOthers = document.querySelectorAll('.pf-sort');
		var petFilterToggleAll = document.querySelectorAll('.pf-toggle-all');

		// Setup save filter settings
		var petfinderSortSave = function (filter) {
			if ( window.sessionStorage ) {
				var name = filter.getAttribute('data-target');
				if ( filter.checked === false ) {
					sessionStorage.setItem(name, 'unchecked');
				} else {
					sessionStorage.removeItem(name);
				}
			}
		};

		// Setup show/hide filter
		var petfinderSort = function () {
			[].forEach.call(pets, function (pet) {
				buoy.addClass(pet, 'hide');
			});
			[].forEach.call(petFilterBreeds, function (filter) {
				var sortTargetValue = filter.getAttribute('data-target');
				var sortTargets = document.querySelectorAll(sortTargetValue);
				if ( filter.checked === true ) {
					[].forEach.call(sortTargets, function (target) {
						buoy.removeClass(target, 'hide');
					});
				}
			});
			[].forEach.call(petFilterOthers, function (filter) {
				var sortTargetValue = filter.getAttribute('data-target');
				var sortTargets = document.querySelectorAll(sortTargetValue);
				if ( filter.checked === false ) {
					[].forEach.call(sortTargets, function (target) {
						buoy.addClass(target, 'hide');
					});
				}
			});
		};

		// Toggle all breeds
		[].forEach.call(petFilterToggleAll, function (filter) {
			filter.addEventListener('change', function(e) {
				var sortTargetValue = filter.getAttribute('data-target');
				var sortTargets = document.querySelectorAll(sortTargetValue);
				if ( filter.checked === true ) {
					[].forEach.call(sortTargets, function (target) {
						target.checked = true;
						petfinderSortSave(target);
					});
				} else {
					[].forEach.call(sortTargets, function (target) {
						target.checked = false;
						petfinderSortSave(target);
					});
				}
				petfinderSortSave(filter);
				petfinderSort();
			}, false);
		});

		// Run sort when filter is changed
		[].forEach.call(petFilterBreeds, function (filter) {
			filter.addEventListener('change', function(e) {
				petfinderSort();
				petfinderSortSave(filter);
			}, false);
		});
		[].forEach.call(petFilterOthers, function (filter) {
			filter.addEventListener('change', function(e) {
				petfinderSort();
				petfinderSortSave(filter);
			}, false);
		});

		// Load filter settings on page load
		var petfinderSortGet = function (filter) {
			var name = filter.getAttribute('data-target');
			var status = sessionStorage.getItem(name);
			if ( status === 'unchecked' ) {
				filter.checked = false;
			}
		};
		[].forEach.call(petFilterBreeds, function (filter) {
			petfinderSortGet(filter);
		});
		[].forEach.call(petFilterOthers, function (filter) {
			petfinderSortGet(filter);
		});
		[].forEach.call(petFilterToggleAll, function (filter) {
			petfinderSortGet(filter);
		});
		petfinderSort();

	}

})();







/* =============================================================

	Smooth Scroll 2.3
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

(function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// Function to animate the scroll
		var smoothScroll = function (anchor, duration) {

			// Calculate how far and how fast to scroll
			var startLocation = window.pageYOffset;
			var endLocation = anchor.offsetTop;
			var distance = endLocation - startLocation;
			var increments = distance/(duration/16);
			var stopAnimation;

			// Scroll the page by an increment, and check if it's time to stop
			var animateScroll = function () {
				window.scrollBy(0, increments);
				stopAnimation();
			};

			// If scrolling down
			if ( increments >= 0 ) {
				// Stop animation when you reach the anchor OR the bottom of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
						clearInterval(runAnimation);
					}
				};
			}
			// If scrolling up
			else {
				// Stop animation when you reach the anchor OR the top of the page
				stopAnimation = function () {
					var travelled = window.pageYOffset;
					if ( travelled <= (endLocation || 0) ) {
						clearInterval(runAnimation);
					}
				};
			}

			// Loop the animation function
			var runAnimation = setInterval(animateScroll, 16);

		};

		// Define smooth scroll links
		var scrollToggle = document.querySelectorAll('.scroll');

		// For each smooth scroll link
		[].forEach.call(scrollToggle, function (toggle) {

			// When the smooth scroll link is clicked
			toggle.addEventListener('click', function(e) {

				// Prevent the default link behavior
				e.preventDefault();

				// Get anchor link and calculate distance from the top
				var dataID = toggle.getAttribute('href');
				var dataTarget = document.querySelector(dataID);
				var dataSpeed = toggle.getAttribute('data-speed');

				// If the anchor exists
				if (dataTarget) {
					// Scroll to the anchor
					smoothScroll(dataTarget, dataSpeed || 300);
				}

			}, false);

		});

	}

})();





/* =============================================================

		Slider v3.3
		A simple, responsive, touch-enabled image slider, forked from Swipe.

		Script by Brad Birdsall.
		http://swipejs.com/

		Forked by Chris Ferdinandi.
		http://gomakethings.com

		Code contributed by Ron Ilan.
		https://github.com/bradbirdsall/Swipe/pull/277

		Licensed under the MIT license.
		http://gomakethings.com/mit/

 * ============================================================= */

if ( 'querySelector' in document && 'addEventListener' in window ) {

	var Swipe = function (container, options) {

		"use strict";

		// utilities
		var noop = function() {}; // simple no operation function
		var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

		// check browser capabilities
		var browser = {
			addEventListener: !!window.addEventListener,
			touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
			transitions: (function(temp) {
				var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
				for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
				return false;
			})(document.createElement('swipe'))
		};

		// quit if no root element
		if (!container) return;
		var element = container.children[0];
		var slides, slidePos, width, length;
		options = options || {};
		var index = parseInt(options.startSlide - 1, 10) || 0;
		var speed = options.speed || 300;
		options.continuous = options.continuous !== undefined ? options.continuous : true;

		var setup = function () {

			// cache slides
			slides = element.children;
			length = slides.length;

			// set continuous to false if only one slide
			if (slides.length < 2) options.continuous = false;

			// create an array to store current positions of each slide
			slidePos = new Array(slides.length);

			// determine width of each slide
			width = container.getBoundingClientRect().width || container.offsetWidth;

			element.style.width = (slides.length * width) + 'px';

			// stack elements
			var pos = slides.length;
			while(pos--) {

				var slide = slides[pos];

				slide.style.width = width + 'px';
				slide.setAttribute('data-index', pos);

				if (browser.transitions) {
					slide.style.left = (pos * -width) + 'px';
					move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
				}

			}

			// reposition elements before and after index
			if (options.continuous && browser.transitions) {
				move(circle(index-1), -width, 0);
				move(circle(index+1), width, 0);
			}

			if (!browser.transitions) element.style.left = (index * -width) + 'px';

			visibleThree(index, slides);

			container.style.visibility = 'visible';

		};

		var prev = function () {

			if (options.continuous) slide(index-1);
			else if (index) slide(index-1);

		};

		var next = function () {

			if (options.continuous) slide(index+1);
			else if (index < slides.length - 1) slide(index+1);

		};

		var circle = function (index) {

			// a simple positive modulo using slides.length
			return (slides.length + (index % slides.length)) % slides.length;

		};

		var slide = function (to, slideSpeed) {

			// do nothing if already on requested slide
			if (index == to) return;

			if (browser.transitions) {

				var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

				// get the actual position of the slide
				if (options.continuous) {
					var natural_direction = direction;
					direction = -slidePos[circle(to)] / width;

					// if going forward but to < index, use to = slides.length + to
					// if going backward but to > index, use to = -slides.length + to
					if (direction !== natural_direction) to =  -direction * slides.length + to;

				}

				var diff = Math.abs(index-to) - 1;

				// move all the slides between index and to in the right direction
				while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

				to = circle(to);

				move(index, width * direction, slideSpeed || speed);
				move(to, 0, slideSpeed || speed);

				if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

			} else {

				to = circle(to);
				animate(index * -width, to * -width, slideSpeed || speed);
				//no fallback for a circular continuous if the browser does not accept transitions
			}

			index = to;
			offloadFn(options.callback && options.callback(index, slides[index]));
		};

		var move = function (index, dist, speed) {

			translate(index, dist, speed);
			slidePos[index] = dist;

		};

		var translate = function (index, dist, speed) {

			var slide = slides[index];
			var style = slide && slide.style;

			if (!style) return;

			style.webkitTransitionDuration =
			style.MozTransitionDuration =
			style.msTransitionDuration =
			style.OTransitionDuration =
			style.transitionDuration = speed + 'ms';

			style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
			style.msTransform =
			style.MozTransform =
			style.OTransform = 'translateX(' + dist + 'px)';

		};

		var animate = function (from, to, speed) {

			// if not an animation, just reposition
			if (!speed) {

				element.style.left = to + 'px';
				return;

			}

			var start = +new Date;

			var timer = setInterval(function() {

				var timeElap = +new Date - start;

				if (timeElap > speed) {

					element.style.left = to + 'px';

					if (delay) begin();

					options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

					clearInterval(timer);
					return;

				}

				element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

			}, 4);

		};

		// hide all slides other than current one
		function visibleThree(index, slides) {

			var pos = slides.length;

			// first make this one visible
			slides[index].style.visibility = 'visible';

			// then check all others for hiding
			while(pos--) {

				if(pos === circle(index) || pos === circle(index-1) || pos === circle(index+1)){
					slides[pos].style.visibility = 'visible';
				} else {
					slides[pos].style.visibility = 'hidden';
				}

			}

		}

		// setup auto slideshow
		var delay = options.auto || 0;
		var interval;

		var begin = function () {

			interval = setTimeout(next, delay);

		};

		var stop = function () {

			delay = 0;
			clearTimeout(interval);

		};


		// setup initial vars
		var start = {};
		var delta = {};
		var isScrolling;

		// setup event capturing
		var events = {

			handleEvent: function(event) {

				switch (event.type) {
					case 'touchstart': this.start(event); break;
					case 'touchmove': this.move(event); break;
					case 'touchend': offloadFn(this.end(event)); break;
					case 'webkitTransitionEnd':
					case 'msTransitionEnd':
					case 'oTransitionEnd':
					case 'otransitionend':
					case 'transitionend': offloadFn(this.transitionEnd(event)); break;
					case 'resize': offloadFn(setup.call()); break;
				}

				if (options.stopPropagation) event.stopPropagation();

			},
			start: function(event) {

				var touches = event.touches[0];

				// measure start values
				start = {

					// get initial touch coords
					x: touches.pageX,
					y: touches.pageY,

					// store time to determine touch duration
					time: +new Date

				};

				// used for testing first move event
				isScrolling = undefined;

				// reset delta and end measurements
				delta = {};

				// attach touchmove and touchend listeners
				element.addEventListener('touchmove', this, false);
				element.addEventListener('touchend', this, false);

			},
			move: function(event) {

				// ensure swiping with one touch and not pinching
				if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;

				if (options.disableScroll) event.preventDefault();

				var touches = event.touches[0];

				// measure change in x and y
				delta = {
					x: touches.pageX - start.x,
					y: touches.pageY - start.y
				};

				// determine if scrolling test has run - one time test
				if ( typeof isScrolling == 'undefined') {
					isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
				}

				// if user is not trying to scroll vertically
				if (!isScrolling) {

					// prevent native scrolling
					event.preventDefault();

					// stop slideshow
					stop();

					// increase resistance if first or last slide
					if (options.continuous) { // we don't add resistance at the end

						translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
						translate(index, delta.x + slidePos[index], 0);
						translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

					} else {

						delta.x =
							delta.x /
								( (!index && delta.x > 0               // if first slide and sliding left
								|| index == slides.length - 1        // or if last slide and sliding right
								&& delta.x < 0                       // and if sliding at all
								) ?
								( Math.abs(delta.x) / width + 1 )      // determine resistance level
								: 1 );                                 // no resistance if false

						// translate 1:1
						translate(index-1, delta.x + slidePos[index-1], 0);
						translate(index, delta.x + slidePos[index], 0);
						translate(index+1, delta.x + slidePos[index+1], 0);
					}

				}

			},
			end: function(event) {

				// measure duration
				var duration = +new Date - start.time;

				// determine if slide attempt triggers next/prev slide
				var isValidSlide =
							Number(duration) < 250               // if slide duration is less than 250ms
							&& Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
							|| Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

				// determine if slide attempt is past start and end
				var isPastBounds =
							!index && delta.x > 0                            // if first slide and slide amt is greater than 0
							|| index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

				if (options.continuous) isPastBounds = false;

				// determine direction of swipe (true:right, false:left)
				var direction = delta.x < 0;

				// if not scrolling vertically
				if (!isScrolling) {

					if (isValidSlide && !isPastBounds) {

						if (direction) {

							if (options.continuous) { // we need to get the next in this direction in place

								move(circle(index-1), -width, 0);
								move(circle(index+2), width, 0);

							} else {
								move(index-1, -width, 0);
							}

							move(index, slidePos[index]-width, speed);
							move(circle(index+1), slidePos[circle(index+1)]-width, speed);
							index = circle(index+1);

						} else {
							if (options.continuous) { // we need to get the next in this direction in place

								move(circle(index+1), width, 0);
								move(circle(index-2), -width, 0);

							} else {
								move(index+1, width, 0);
							}

							move(index, slidePos[index]+width, speed);
							move(circle(index-1), slidePos[circle(index-1)]+width, speed);
							index = circle(index-1);

						}

						options.callback && options.callback(index, slides[index]);

					} else {

						if (options.continuous) {

							move(circle(index-1), -width, speed);
							move(index, 0, speed);
							move(circle(index+1), width, speed);

						} else {

							move(index-1, -width, speed);
							move(index, 0, speed);
							move(index+1, width, speed);
						}

					}

				}

				// kill touchmove and touchend event listeners until touchstart called again
				element.removeEventListener('touchmove', events, false);
				element.removeEventListener('touchend', events, false);

			},
			transitionEnd: function(event) {

				visibleThree(index, slides);

				if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

					if (delay) begin();

					options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

				}

			}

		};

		// trigger setup
		setup();

		// start auto slideshow if applicable
		if (delay) begin();


		// add event listeners
		if (browser.addEventListener) {

			// set touchstart event on element
			if (browser.touch) element.addEventListener('touchstart', events, false);

			if (browser.transitions) {
				element.addEventListener('webkitTransitionEnd', events, false);
				element.addEventListener('msTransitionEnd', events, false);
				element.addEventListener('oTransitionEnd', events, false);
				element.addEventListener('otransitionend', events, false);
				element.addEventListener('transitionend', events, false);
			}

			// set resize event on window
			window.addEventListener('resize', events, false);

		} else {

			window.onresize = function () { setup() }; // to play nice with old IE

		}

		// expose the Swipe API
		return {
			setup: function() {

				setup();

			},
			slide: function(to, speed) {

				// cancel slideshow
				stop();

				slide(to, speed);

			},
			prev: function() {

				// cancel slideshow
				stop();

				prev();

			},
			next: function() {

				// cancel slideshow
				stop();

				next();

			},
			getPos: function() {

				// return current index position
				return index + 1;

			},
			getNumSlides: function() {

				// return total number of slides
				return length;
			},
			kill: function() {

				// cancel slideshow
				stop();

				// reset element
				element.style.width = 'auto';
				element.style.left = 0;

				// reset slides
				var pos = slides.length;
				while(pos--) {

					var slide = slides[pos];
					slide.style.width = '100%';
					slide.style.left = 0;

					if (browser.transitions) translate(pos, 0, 0);

				}

				// removed event listeners
				if (browser.addEventListener) {

					// remove current event listeners
					element.removeEventListener('touchstart', events, false);
					element.removeEventListener('webkitTransitionEnd', events, false);
					element.removeEventListener('msTransitionEnd', events, false);
					element.removeEventListener('oTransitionEnd', events, false);
					element.removeEventListener('otransitionend', events, false);
					element.removeEventListener('transitionend', events, false);
					window.removeEventListener('resize', events, false);

				}
				else {

					window.onresize = null;

				}

			}
		};

	};

}