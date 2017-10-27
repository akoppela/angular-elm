// ELM
var Elm = require('build/elm'),
    app = Elm.Main.embed(document.body);

// ANGULAR
angular.module('Main', []);

angular
    .module('Main')
    .component('body', {
        controllerAs: 'vm',
        controller: function ($scope, $element, $compile) {
            var vm = this;

            vm.$onInit = function () {
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        mutation.addedNodes.forEach(function (node) {
                            $compile(node)($scope);
                        });
                    });
                });

                observer.observe($element[0], {
                    childList: true,
                    subtree: true
                });
            };

            vm.$onDestroy = function () {
                if (observer) {
                    observer.disconnect();
                }
            };
        }
    });

angular
    .module('Main')
    .component('ngModelToElm', {
        template: function () {
            return '<label>I\'m the input managed by Angular</label>' +
                '<input type="text" ng-model="vm.name" ng-change="vm.action.dispatchNameChange()">';
        },
        bindings: {
            name: '@'
        },
        controllerAs: 'vm',
        controller: function ($element, $scope) {
            var vm = this,
                observer;

            vm.action = {
                dispatchNameChange: dispatchNameChange
            };

            vm.$onInit = function () {
                observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        vm[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);

                        $scope.$applyAsync();
                    });
                });

                observer.observe($element[0], {
                    attributes: true,
                    attributeFilter: ['name']
                });
            };

            vm.$onDestroy = function () {
                if (observer) {
                    observer.disconnect();
                }
            };

            function dispatchNameChange() {
                var updateNameEvent = new CustomEvent('UpdateName', {
                    detail: vm.name
                });
                
                $element[0].dispatchEvent(updateNameEvent);
            }
        }
    });