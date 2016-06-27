(function() {
    'use strict';

    angular
        .module('app')
        .directive('menuDisplay', menuDisplay);

    menuDisplay.$inject = [];

    /* @ngInject */
    function menuDisplay() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: MenuDisplayCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            scope: {},
            templateUrl: 'dist/views/menu.html'
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    MenuDisplayCtrl.$inject = ['$log', '$scope','$state', 'menuService'];
    /* @ngInject */
    function MenuDisplayCtrl($log,$scope, $state, menuService) {
        var vm = this;
        
        vm.goToSection = changeState;
        vm.close = menuService.close;
        vm.toggleLeft = menuService.openMenu('left', $scope);



        function changeState(section){
            $state.go(section);
            vm.close();
        }

        vm.menu = [{
            name: 'home',
            icon: 'home',
            link: 'home'

        }, {
            name: 'about',
            icon: 'person',
            link: ''

        }, {
            name: 'education',
            icon: 'school',
            link: ''

        }, {
            name: 'experience',
            icon: 'work',
            link: 'work'

        }, {
            name: 'skills',
            icon: 'build',
            link: ''
        }, {
            name: 'contact',
            icon: 'send',
            link: ''
        } ];

    }
})();