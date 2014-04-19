describe('rdx.interview.step.controllers', function() {

  describe('interview-step1-controller', function() {
    var scope, ctrl;

    beforeEach(module('rdx.interview.step.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(function(){
      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      ctrl = $controller('interview-step1-controller', {$scope: scope});
    }));

    it('should assign phone parts', function() {
      expect(scope.phone_parts).toEqualData({});
    });

    it('should assign phoneNumberParts method', function() {
      expect(scope.phoneNumberParts).toBeDefined();
    });
  });
});
