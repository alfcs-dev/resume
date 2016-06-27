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





	}
})();