'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/detail/:phoneId', {
        templateUrl: 'templates/detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
}]);

phonecatApp.run(function($rootScope) {
    $rootScope.uri = 'rootScope-variable';
});