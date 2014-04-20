describe('rdx.home.controllers', function() {

  describe('home-controller', function() {
    var scope, cases;

    beforeEach(module('rdx.home.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(module(function ($provide) {
      cases = {
        all: function() {
        }
      };
      $provide.value('cases', cases);
    }));

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      $controller('home-controller', {$scope: scope, cases: cases});
    }));

    it('should get all the cases', function() {
    });

    it('should define a start method', function() {
      expect(scope.start).toBeDefined();
    });
  });
});
