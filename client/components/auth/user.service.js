'use strict';

angular.module('testmeanApp')
  .factory('User', function ($resource) {
    return $resource('/treasure/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });
