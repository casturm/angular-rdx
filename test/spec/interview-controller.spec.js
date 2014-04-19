describe('rdx.interview.controllers', function() {

  describe('interview-controller', function() {
    var scope, cases;

    beforeEach(module('rdx.interview.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(function(){
      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    beforeEach(module(function ($provide) {
      cases = {
        current: function() {
          return {id: 3, name: 'tester'};
        }
      };
      $provide.value('cases', cases);
    }));

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      $controller('interview-controller', {$scope: scope, cases: cases});
    }));

    it('should assign breadcrumbs with interview step states', function() {
      expect(scope.breadcrumbs.length).toEqual(4);
    });

    it('should assign current interview', function() {
      expect(scope.interview).toEqualData({id: 3, name: 'tester'});
    });

    it('should define a save method', function() {
      expect(scope.save).toBeDefined();
    });

    it('should define a pageHeader method', function() {
      expect(scope.pageHeader).toBeDefined();
    });
  });
});
