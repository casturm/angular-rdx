describe('rdx.home.HomeController', function() {
  var scope, Interview;

  beforeEach(module('rdx.home'));
  beforeEach(module('ui.router'));

  beforeEach(module(function ($provide) {
    Interview = {
      create: function() {}
    };
    $provide.value('Interview', Interview);
  }));

  beforeEach(inject(function($rootScope, $state, $controller) {
    scope = $rootScope.$new();
  }));

  beforeEach(inject(function($rootScope, $q, $state, $controller) {
    var deferred = $q.defer();
    rootScope = $rootScope;
    scope = $rootScope.$new();
    scope.$state = $state;

    deferred.resolve();
    spyOn(Interview, 'create').andReturn(deferred.promise);
    $controller('HomeController', {$scope: scope, Interview: Interview});
  }));

  it('should define a start method', function() {
    expect(angular.isFunction(scope.start)).toBe(true);
  });

  it('should start a new interview and go to step1 when start() is called', function() {
    spyOn(scope.$state, 'go');
    scope.start();

    scope.$apply();

    expect(Interview.create).toHaveBeenCalled();
    expect(scope.$state.go).toHaveBeenCalledWith('interview.step1');
  });
});
