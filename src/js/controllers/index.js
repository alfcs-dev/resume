(function() {
  'use strict';

  angular
    .module('app')
    .controller('indexCtrl', indexCtrl);
  /* @ngInject */
  function indexCtrl($log, $translate, $mdSidenav, $scope, $timeout) {
    /* jshint validthis:true */
    var vm = this;
    vm.changeLanguage = changeLanguage;
    vm.toggleLeft = buildDelayedToggler('left');

    function changeLanguage(key) {
      $translate.use(key);
    }

    vm.languages = [{
      language: 'Español',
      code: 'ES',
      shortName: 'es'
    }, {
      language: 'English',
      code: 'EN',
      shortName: 'en'
    }, {
      language: 'Deutsch',
      code: 'DE',
      shortName: 'de'
    }];

    

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