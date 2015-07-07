'use strict';

angular.module('testmeanApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.downloadJson = function() {
      $http.get('/treasure/api/payments/export/json').success(function(data) {
        var jsondata = JSON.stringify(data, null, '\t');
        var blob = new Blob([jsondata], {type: "text/plain;charset=utf-8"});
        var filename = 'ttexport_' + moment().format('YYYY-MM-DD-HHMMSS') + '.json';
        saveAs(blob, filename);
      });
    };

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
