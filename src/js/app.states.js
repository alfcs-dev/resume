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
          label: 'Home Page'
        },
      }).state('about', {
        parent: 'site',
        url: '/about',
        templateUrl: viewsPath + 'about.html',
        ncyBreadcrumb: {
          label: 'About'
        },
      }).state('education', {
        parent: 'site',
        url: '/education',
        templateUrl: viewsPath + 'education.html',
        ncyBreadcrumb: {
          label: 'About'
        },
      }).state('work', {
        parent: 'site',
        url: '/work',
        templateUrl: viewsPath + 'work.html',
        ncyBreadcrumb: {
          label: 'Work'
        },
      }).state('skills', {
        parent: 'site',
        url: '/skills',
        templateUrl: viewsPath + 'skills.html',
        ncyBreadcrumb: {
          label: 'Skills'
        },
      }).state('contact', {
        parent: 'site',
        url: '/contact',
        templateUrl: viewsPath + 'contact.html',
        ncyBreadcrumb: {
          label: 'contact'
        },
      });
  }
}());
