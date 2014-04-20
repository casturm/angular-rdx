describe('rdx.interview.step.controllers', function() {

  describe('interview-step4-controller', function() {
    var scope;

    beforeEach(module('rdx.interview.step.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      $controller('interview-step4-controller', {$scope: scope});
    }));

    it('should assign finish method', function() {
      expect(scope.finish).toBeDefined();
    });
  });
});
