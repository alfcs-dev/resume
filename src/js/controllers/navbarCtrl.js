(function() {
	'use strict';

	angular
		.module('app')
		.controller('navBarCtrl', NavBarCtrl);

	NavBarCtrl.$inject = ['$mdSidenav', '$log'];

	/* @ngInject */
	function NavBarCtrl($mdSidenav, $log) {
		var vm = this;
		vm.menuTitle = 'Menú';
		vm.close = close;
		vm.toggleLeft = buildDelayedToggler('left');

		function close() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close().then(function() {
				$log.debug('close LEFT is done');
			});
		}


		function debounce(func, wait, context) {
			var timer;
			return function debounced() {
				var context = $scope,
					args = Array.prototype.slice.call(arguments);
				$timeout.cancel(timer);
				timer = $timeout(function() {
					timer = undefined;
					func.apply(context, args);
				}, wait || 10);
			};
		}

		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildDelayedToggler(navID) {
			return debounce(function() {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav(navID)
					.toggle()
					.then(function() {
						$log.debug('toggle ' + navID + ' is done');
					});
			}, 200);
		}
	}
})();