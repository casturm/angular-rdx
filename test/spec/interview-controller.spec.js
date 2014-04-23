describe('rdx.interview.controllers', function() {

  describe('InterviewController', function() {
    var scope, Cases;

    beforeEach(module('rdx.interview.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(module(function ($provide) {
      Cases = {
        current: function() {
          return {id: 3, name: 'tester'};
        }
      };
      $provide.value('Cases', Cases);
    }));

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      $controller('InterviewController', {$scope: scope, Cases: Cases});
    }));

    it('should assign breadcrumbs with interview step states', function() {
      expect(scope.breadcrumbs.length).toEqual(4);
    });

    it('should assign current interview', function() {
      expect(scope.interview).toEqual({id: 3, name: 'tester'});
    });

    it('should define a save method', function() {
      expect(scope.save).toBeDefined();
    });

    it('should define a pageHeader method', function() {
      expect(scope.pageHeader).toBeDefined();
    });
  });
});
