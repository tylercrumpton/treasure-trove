'use strict';

angular.module('testmeanApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mydonations/', {
        templateUrl: 'app/donations/mydonations.html',
        controller: 'MyDonationsCtrl',
        authenticate: true
      })
      .when('/donations', {
        templateUrl: 'app/donations/donations.html',
        controller: 'DonationsCtrl',
        authenticate: true
      });
  });
