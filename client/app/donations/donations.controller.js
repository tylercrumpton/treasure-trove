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

    var processUserPayments = function(user) {
      $http.get('/api/payments/users/'+$scope.membersDict[i].name+'/'+$scope.year).success(function(memberPayments) {
        for (var j=0; j<memberPayments.length; j++) {
          var month = memberPayments[j].month;
          $scope.membersDict[user].months[month] = 1;
        }
      });
    };
    for (var i=0; i<$scope.membersDict.length; i++) {
      processUserPayments(i);
    }

    $scope.togglePayment = function(user, month) {
      if($scope.membersDict[user].months[month] == 0) {
        $http.post('/api/payments', { name: $scope.membersDict[user].name,
                                      month: month,
                                      year: $scope.year });
      } else {
        $http.delete('/api/payments/users/'+$scope.membersDict[user].name+'/'+$scope.year+'/'+month);
      }

      var prev = $scope.membersDict[user].months[month];
      $scope.membersDict[user].months[month] = 1-prev;

    };

    socket.socket.on('payment:save', function (data) {
      for (var i=0; i<$scope.membersDict.length; i++) {
        if ($scope.membersDict[i].name == data.name) {
          $scope.membersDict[i].months[data.month] = 1;
        }
      }
    });
    socket.socket.on('payment:remove', function (data) {
      for (var i=0; i<$scope.membersDict.length; i++) {
        if ($scope.membersDict[i].name == data.name) {
          $scope.membersDict[i].months[data.month] = 0;
        }
      }
    });
  });
