'use strict';

angular.module('testmeanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/donations', {
        templateUrl: 'app/donations/donations.html',
        controller: 'DonationsCtrl'
      });
  });
