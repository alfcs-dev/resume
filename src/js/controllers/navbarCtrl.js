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
		

		function close() {
			// Component lookup should always be available since we are not using `ng-if`
			$mdSidenav('left').close().then(function() {
				$log.debug('close LEFT is done');
			});
		}





	}
})();