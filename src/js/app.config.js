(function() {
  'use strict';
  angular.module('app').config(configFn);

  function configFn($stateProvider, $urlRouterProvider, $locationProvider) {
    var viewsPath = 'dist/views/';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('site', {
        abstract: true,
        template: '<ui-view/>',
        ncyBreadcrumb: {
          skip: true // Never display this state in breadcrumb.
        },
      })
      .state('home', {
        parent: 'site',
        url: '/',
        templateUrl: viewsPath + 'home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          skip: 'Home Page'
        },
      });
  }
}());
