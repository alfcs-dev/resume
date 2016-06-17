(function () {
  'use strict';
  angular.module('app').config(configFn);

  function configFn ($translateProvider) {
    
    $translateProvider.fallbackLanguage('en');

    $translateProvider.useStaticFilesLoader({
      prefix: 'dist/translations/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');

    $translateProvider.useLocalStorage();
  }
})();
