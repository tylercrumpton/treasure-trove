'use strict';

angular.module('testmeanApp')
  .filter("toArray", function(){
    return function(obj) {
      var result = [];
      angular.forEach(obj, function(val, key) {
        result.push(val);
      });
      return result;
    };
  })
  .controller('DonationsCtrl', function ($scope, $http, socket, User) {
    var date = new Date();
    $scope.year = date.getFullYear();
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.sortType     = 'realname'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchName   = '';     // set the default search/filter term    
    var processUserPayments = function(username) {
      $http.get('/treasure/api/payments/users/'+username+'/'+$scope.year).success(function(memberPayments) {
        for (var j=0; j<memberPayments.length; j++) {
          var month = memberPayments[j].month;
          $scope.membersDict[username].months[month] = 1;
        }
      });
    };
   
    $scope.membersDict = {}; 
    User.query().$promise.then(function(result){
      angular.forEach(result, function(u, i) {
        $scope.membersDict[u.username] = {username: u.username, realname: u.realname, email: u.email, months: [0,0,0,0,0,0,0,0,0,0,0,0]};
        processUserPayments(u.username);
      });
    });

    $scope.togglePayment = function(username, month) {
      if($scope.membersDict[username].months[month] == 0) {
        $http.post('/treasure/api/payments', { name: username,
                                      month: month,
                                      year: $scope.year });
      } else {
        $http.delete('/treasure/api/payments/users/'+username+'/'+$scope.year+'/'+month);
      }

      var prev = $scope.membersDict[username].months[month];
      $scope.membersDict[username].months[month] = 1-prev;

    };

    socket.socket.on('payment:save', function (data) {
      $scope.membersDict[data.name].months[data.month] = 1;
    });
    socket.socket.on('payment:remove', function (data) {
      $scope.membersDict[data.name].months[data.month] = 0;
    });
  });
