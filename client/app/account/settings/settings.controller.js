'use strict';

angular.module('testmeanApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
