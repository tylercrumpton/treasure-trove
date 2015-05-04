'use strict';

angular.module('testmeanApp')
  .controller('DonationsCtrl', function ($scope, $http, socket) {
    var date = new Date();
    $scope.year = date.getFullYear();
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // TODO: Get the users from LDAP and paid months from DB:
    $scope.membersDict = [
      { name: 'Tyler', username: 'tylercrumpton', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Nathan', username: 'itsamenathan', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
      { name: 'Hunter', username: 'hunter', months: [0,0,0,0,0,0,0,0,0,0,0,0] },
    ];
    $http.get('/api/payments').success(function(memberPayments) {
      $scope.memberPayments = memberPayments;
      socket.syncUpdates('payment', $scope.memberPayments);
    });

    $scope.togglePayment = function(user, month) {
      if($scope.membersDict[user].months[month] == 0) {
        $http.post('/api/payments', { name: $scope.membersDict[user].name,
                                      month: month,
                                      year: $scope.year });
      } else {
        $http.delete('/api/payments/'+$scope.membersDict[user].name+'/'+$scope.year+'/'+month);
      }

      var prev = $scope.membersDict[user].months[month];
      $scope.membersDict[user].months[month] = 1-prev;

    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('payment');
    });
  });
