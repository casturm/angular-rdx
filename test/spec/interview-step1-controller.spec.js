describe('rdx.interview.step.controllers', function() {

  describe('interview-step1-controller', function() {
    var scope;

    beforeEach(module('rdx.interview.step.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      $controller('interview-step1-controller', {$scope: scope});
    }));

    it('should assign phone parts', function() {
      expect(scope.phone_parts).toEqual({});
    });

    it('should assign phoneNumberParts method', function() {
      expect(scope.phoneNumberParts).toBeDefined();
    });
  });
});
