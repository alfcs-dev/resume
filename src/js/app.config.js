(function () {
  'use strict';
  angular.module('app').config(configFn);

  function configFn ($translateProvider) {
    $translateProvider.translations('en', {
      TITLE: 'Hello',
      FOO: 'This is a paragraph.',

    }).translations('de', {
      TITLE: 'Hallo',
      FOO: 'Dies ist ein Paragraph.',

    }).translations('es', {
      TITLE: 'Hola',
      FOO: 'Esto es un parrafo',
    }).fallbackLanguage('en');

    var language = navigator.language || navigator.userLanguage;
    $translateProvider.preferredLanguage(language);
  }
})();
