'use strict';

angular.module('testmeanApp')
  .controller('DonationsCtrl', function ($scope, $http, socket) {
    // TODO: Get the users from LDAP:
    $scope.members = ['User 1', 'User 2', 'User 3'];

    var date = new Date();
    $scope.year = date.getFullYear();
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

    $http.get('/api/payments').success(function(memberPayments) {
      $scope.memberPayments = memberPayments;
      socket.syncUpdates('payment', $scope.memberPayments);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('payment');
    });
  });
