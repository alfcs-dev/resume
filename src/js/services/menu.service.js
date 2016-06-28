(function() {
	'use strict';

	angular
		.module('app')
		.factory('menuService', menuService);

	menuService.$inject = ['$mdSidenav', '$timeout', '$state', '$log', '$window'];

	/* @ngInject */
	function menuService($mdSidenav, $timeout, $state, $log, $window) {
		var service = {
			openMenu: openMenu,
			close: close,
			go: changeState
		};
		var scope = {};

		return service;

		////////////////

		function openMenu(navID, scope) {
			return debounce(function() {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav(navID)
					.toggle()
					.then(function() {
						$window.scrollTo(0,0);
					});
			}, 200, scope);
		}

		function debounce(func, wait, context) {
			var timer;
			return function debounced() {
				var args = Array.prototype.slice.call(arguments);
				$timeout.cancel(timer);
				timer = $timeout(function() {
					timer = undefined;
					func.apply(context, args);
				}, wait || 10);
			};
		}



		function changeState(section) {
			$state.go(section);
			close();
		}



		function close() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close().then(function() {
				$log.debug('close LEFT is done');
			});
		}

	}
})();