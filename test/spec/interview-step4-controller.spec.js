describe('rdx.interview.step.controllers', function() {

  describe('InterviewStep4Controller', function() {
    var scope;

    beforeEach(module('rdx.interview.step.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      $controller('InterviewStep4Controller', {$scope: scope});
    }));

    it('should assign finish method', function() {
      expect(scope.finish).toBeDefined();
    });
  });
});
