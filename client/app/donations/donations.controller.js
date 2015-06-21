'use strict';

angular.module('testmeanApp')
  .directive('highlighter', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        model: '=highlighter'
      },
      link: function(scope, element, attrs) {
        scope.$watch('model', function (nv, ov) {
          if (nv !== ov && attrs.dohighlight === "true") {
            // apply class
            element.addClass('highlight');

            // auto remove after some delay
            $timeout(function () {
              element.removeClass('highlight');
            }, 5000);
          }
        });
      }
    };
  }])
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
    $scope.membersLoaded = 0;
    $scope.year = date.getFullYear();
    $scope.thisMonth = date.getMonth();
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.sortType = 'lastname'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.searchMembers = ''; // set the default search/filter term
    var processUserPayments = function(username) {
      $http.get('/treasure/api/payments/users/'+username+'/'+$scope.year).success(function(memberPayments) {
        for (var j=0; j<memberPayments.length; j++) {
          var month = memberPayments[j].month;
          $scope.membersDict[username].months[month] = 1;
        }
        $scope.membersLoaded += 1;
      });
    };
   
    $scope.membersDict = {}; 
    User.query().$promise.then(function(result){
      angular.forEach(result, function(u, i) {
        $scope.membersDict[u.username] = {username: u.username, lastname: u.lastname, firstname: u.firstname, email: u.email, months: [0,0,0,0,0,0,0,0,0,0,0,0]};
        processUserPayments(u.username);
      });
      $scope.numMembers = Object.keys($scope.membersDict).length;
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
