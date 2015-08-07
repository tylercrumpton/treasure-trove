'use strict';

angular.module('testmeanApp')
  .controller('MyDonationsCtrl', function ($scope, $http, socket, User) {
    var date = new Date();
    $scope.payments = [0,0,0,0,0,0,0,0,0,0,0,0]
    $scope.year = date.getFullYear();
    $scope.thisMonth = date.getMonth();
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var processUserPayments = function() {
      $http.get('/treasure/api/payments/me/'+$scope.year).success(function(memberPayments) {
        for (var j=0; j<memberPayments.length; j++) {
          var month = memberPayments[j].month;
          $scope.payments[month] = 1;
        }
      });
    };
  
    processUserPayments();
 
    socket.socket.on('payment:save', function (data) {
      $scope.membersDict[data.name].months[data.month] = 1;
    });
    socket.socket.on('payment:remove', function (data) {
      $scope.membersDict[data.name].months[data.month] = 0;
    });
  });
