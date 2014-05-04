describe('rdx.interview.InterviewStep4Controller', function() {
  var scope;

  beforeEach(module('rdx.interview'));
  beforeEach(module('rdx.quotes'));

  beforeEach(inject(function($rootScope, $controller, _Quotes_) {
    scope = $rootScope.$new();
    scope.interview = {};
    $controller('InterviewStep4Controller', {$scope: scope, Quotes: _Quotes_});
  }));

  it('should assign finish method', function() {
    expect(scope.finish).toBeDefined();
  });
});
