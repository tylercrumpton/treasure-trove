'use strict';

describe('Controller: DonationsCtrl', function () {

  // load the controller's module
  beforeEach(module('testmeanApp'));

  var DonationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonationsCtrl = $controller('DonationsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
