describe('rdx.home.HomeController', function() {
  var scope, Cases;

  beforeEach(module('rdx.home'));
  beforeEach(module('ui.router'));

  beforeEach(module(function ($provide) {
    Cases = {
      all: function() {},
      start_interview: function() {}
    };
    $provide.value('Cases', Cases);
  }));

  beforeEach(inject(function($rootScope, $state, $controller) {
    scope = $rootScope.$new();
    scope.$state = $state;
    $controller('HomeController', {$scope: scope, Cases: Cases});
  }));

  it('should define a start method', function() {
    expect(angular.isFunction(scope.start)).toBe(true);
  });

  it('start a new interview and go to step 1 when start() is called', function() {
    spyOn(Cases, 'start_interview');
    spyOn(scope.$state, 'go');
    scope.start();
    expect(Cases.start_interview).toHaveBeenCalled();
    expect(scope.$state.go).toHaveBeenCalledWith('interview.step1');
  });
});
