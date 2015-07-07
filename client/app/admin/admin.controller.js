'use strict';

angular.module('testmeanApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    $scope.downloadJson = function() {
      $http.get('/treasure/api/payments/export/json').success(function(data) {
        var jsondata = JSON.stringify(data, null, '\t');
        var blob = new Blob([jsondata], {type: "text/plain;charset=utf-8"});
        var filename = 'ttexport_' + moment().format('YYYY-MM-DD-HHMMSS') + '.json';
        saveAs(blob, filename);
      });
    };
  });
