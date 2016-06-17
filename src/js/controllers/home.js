(function () {
  'use strict'

  angular
    .module('app')
    .controller('homeCtrl', HomeCtrl)

  HomeCtrl.$inject = ['$log']

  /* @ngInject */
  function HomeCtrl ($log) {
    var vm = this
    vm.title = 'HomeCtrl'
    vm.imagePath = 'img/washedout.png'
    activate()

    // //////////////

    function activate () {
    }


  }
})();
