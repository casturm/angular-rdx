describe('rdx.home.controllers', function() {

  describe('home-controller', function() {
    var scope, Cases;

    beforeEach(module('rdx.home.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(module(function ($provide) {
      Cases = {
        all: function() {
        }
      };
      $provide.value('Cases', Cases);
    }));

    beforeEach(inject(function($rootScope, $state, $controller) {
      scope = $rootScope.$new();
      scope.$state = $state;
      $controller('home-controller', {$scope: scope, Cases: Cases});
    }));

    it('should define a start method', function() {
      expect(scope.start).toBeDefined();
    });
  });
});
