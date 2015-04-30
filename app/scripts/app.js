'use strict';

/**
 * @ngdoc overview
 * @name treasuretroveApp
 * @description
 * # treasuretroveApp
 *
 * Main module of the application.
 */
angular
  .module('treasuretroveApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/table', {
        templateUrl: 'views/table.html',
        controller: 'TableCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
