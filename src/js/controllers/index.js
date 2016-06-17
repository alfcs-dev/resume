(function() {
  'use strict';

  angular
    .module('app')
    .controller('indexCtrl', indexCtrl);
  /* @ngInject */
  function indexCtrl($log, $translate) {
    /* jshint validthis:true */
    var vm = this;
    vm.changeLanguage = changeLanguage;

    function changeLanguage(key) {
      $translate.use(key);
    }

    vm.languages = [{
      language: 'Español',
      code: 'ES',
      shortName: 'es'
    },{
      language: 'English',
      code: 'EN',
      shortName: 'en'
    },{
      language: 'Deutsch',
      code: 'DE',
      shortName: 'de'
    }];


  }
})();