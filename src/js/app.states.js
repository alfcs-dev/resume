(function() {
  'use strict';
  angular.module('app').config(configFn);

  function configFn($stateProvider, $urlRouterProvider, $locationProvider) {
    var viewsPath = 'dist/views/';
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
      }).state('work', {
        parent: 'site',
        url: '/work',
        templateUrl: viewsPath + 'work.html',
        ncyBreadcrumb: {
          skip: 'Work'
        },
      });
  }
}());
