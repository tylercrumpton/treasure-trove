'use strict';

angular.module('treasuretroveApp')
  .controller('TableCtrl', function ($scope) {
    $scope.members = ['User 1', 'User 2', 'User 3'];
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.changeState = function (user, month) {
      console.log('user: %d, month: %d', user, month);
      $scope.messages.push("Message");
    };
    var arrayDefault = Array.apply(null, Array(24)).map(function() { return 0 });
    $scope.membersDict = {'Tyler':arrayDefault, 'Nathan':arrayDefault, 'Hunter':arrayDefault};
    $scope.messages = [];
  });
