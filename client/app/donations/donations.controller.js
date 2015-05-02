'use strict';

angular.module('testmeanApp')
  .controller('DonationsCtrl', function ($scope) {
    $scope.members = ['User 1', 'User 2', 'User 3'];
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.changeState = function (user, month) {
      console.log('user: %d, month: %d', user, month);
      $scope.messages.push('Message');
      var prev = $scope.membersDict[user].months[month];
      $scope.membersDict[user].months[month] = 1-prev;

    };
    $scope.membersDict = [
      { name: 'Tyler', username: 'tylercrumpton', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Nathan', username: 'itsamenathan', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Hunter', username: 'hunter', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
    ];
    $scope.messages = [];
  });
