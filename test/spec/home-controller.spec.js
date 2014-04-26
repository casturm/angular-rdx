describe('rdx.home.HomeController', function() {
  var scope, Interview;

  beforeEach(module('rdx.home'));
  beforeEach(module('ui.router'));

  beforeEach(module(function ($provide) {
    Interview = {
      create: function() {
        return {id: 3};
      }
    };
    $provide.value('Interview', Interview);
  }));

  beforeEach(inject(function($rootScope, $state, $controller) {
    scope = $rootScope.$new();
    scope.$state = $state;
    $controller('HomeController', {$scope: scope, Interview: Interview});
  }));

  it('should define a start method', function() {
    expect(angular.isFunction(scope.start)).toBe(true);
  });

  it('should start a new interview and go to step1 when start() is called', function() {
    spyOn(Interview, 'create');
    spyOn(scope.$state, 'go');
    scope.start();
    expect(Interview.create).toHaveBeenCalled();
    expect(scope.$state.go).toHaveBeenCalledWith('interview.step1');
    scope.$apply();
  });
});
