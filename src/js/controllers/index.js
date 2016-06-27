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
    vm.checkLang = checkCurrentLanguage;

    function changeLanguage(key) {
      $translate.use(key);
    }

    function checkCurrentLanguage(lang){
      var currentLang = localStorage['NG_TRANSLATE_LANG_KEY'];
      if(lang === currentLang){
        return true;
      }else{
        return false;
      }
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

    

  }
})();