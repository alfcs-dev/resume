(function () {
  'use strict'

  angular
    .module('app')
    .controller('homeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$log', 'menuService', '$scope'];

  /* @ngInject */
  function HomeCtrl ($log, menuService, $scope) {
    var vm = this;
    vm.title = 'HomeCtrl';
    vm.imagePath = 'img/washedout.png';
    vm.openMenu = menuService.openMenu('left', $scope);


  }
})();
