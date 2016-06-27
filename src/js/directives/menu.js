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
    MenuDisplayCtrl.$inject = ['$mdSidenav', '$scope', '$timeout', '$log', '$state'];
    /* @ngInject */
    function MenuDisplayCtrl($mdSidenav, $scope, $timeout, $log, $state) {
        var vm = this;
        vm.close = close;
        vm.goToSection = changeState;
        vm.toggleLeft = buildDelayedToggler('left');


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



        function close() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close().then(function() {
                $log.debug('close LEFT is done');
            });
        }

        function changeState(section){
            $state.go(section);
            vm.close();
        }

        vm.menu = [{
            name: 'HOME',
            icon: 'home',
            link: 'home'

        }, {
            name: 'ABOUT',
            icon: 'person',
            link: ''

        }, {
            name: 'EDUCATION',
            icon: 'school',
            link: ''

        }, {
            name: 'EXPERIENCE',
            icon: 'work',
            link: 'work'

        }, {
            name: 'SKILLS',
            icon: 'build',
            link: ''
        }, {
            name: 'CONTACT',
            icon: 'send',
            link: ''
        } ];

    }
})();