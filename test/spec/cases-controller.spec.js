describe('rdx.cases.controllers', function() {

  describe('cases-controller', function() {
    var scope, cases;

    beforeEach(module('rdx.cases.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(module(function ($provide) {
      cases = {
        cases: function() {
          return {};
        }
      };
      $provide.value('cases', cases);
    }));

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      $controller('cases-controller', {$scope: scope, cases: cases});
    }));

    it('should get all the cases and put them on the scope', function() {
      expect(scope.cases).toEqual({});
    });
  });
});
