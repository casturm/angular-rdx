describe('rdx.home.HomeController', function() {
  var scope, Cases;

  beforeEach(module('rdx.home'));

  beforeEach(module(function ($provide) {
    Cases = {
      all: function() {
      }
    };
    $provide.value('Cases', Cases);
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('HomeController', {$scope: scope, Cases: Cases});
  }));

  it('should define a start method', function() {
    expect(scope.start).toBeDefined();
  });
});
