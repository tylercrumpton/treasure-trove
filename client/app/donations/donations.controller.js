'use strict';

angular.module('testmeanApp')
  .controller('DonationsCtrl', function ($scope, $http, socket, User) {
    var date = new Date();
    $scope.year = date.getFullYear();
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.sortType     = 'realname'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchName   = '';     // set the default search/filter term    
    var processUserPayments = function(user) {
      $http.get('/treasure/api/payments/users/'+$scope.membersDict[user].username+'/'+$scope.year).success(function(memberPayments) {
        for (var j=0; j<memberPayments.length; j++) {
          var month = memberPayments[j].month;
          $scope.membersDict[user].months[month] = 1;
        }
      });
    };
   
    $scope.membersDict = []; 
    User.query().$promise.then(function(result){
      angular.forEach(result, function(u, i) {
        $scope.membersDict[i] = {username: u.username, realname: u.realname, email: u.email, months: [0,0,0,0,0,0,0,0,0,0,0,0]};
        processUserPayments(i);
      });
    });

    $scope.togglePayment = function(user, month) {
      if($scope.membersDict[user].months[month] == 0) {
        $http.post('/treasure/api/payments', { name: $scope.membersDict[user].username,
                                      month: month,
                                      year: $scope.year });
      } else {
        $http.delete('/treasure/api/payments/users/'+$scope.membersDict[user].username+'/'+$scope.year+'/'+month);
      }

      var prev = $scope.membersDict[user].months[month];
      $scope.membersDict[user].months[month] = 1-prev;

    };

    socket.socket.on('payment:save', function (data) {
      for (var i=0; i<$scope.membersDict.length; i++) {
        if ($scope.membersDict[i].username == data.name) {
          $scope.membersDict[i].months[data.month] = 1;
        }
      }
    });
    socket.socket.on('payment:remove', function (data) {
      for (var i=0; i<$scope.membersDict.length; i++) {
        if ($scope.membersDict[i].username == data.name) {
          $scope.membersDict[i].months[data.month] = 0;
        }
      }
    });
  });
