describe('rdx.interview.InterviewLifestyleController', function() {
  beforeEach(module('rdx.interview'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.interview = {};
    scope.save = function(isValid, nextStep) {}
    $controller('InterviewLifestyleController', {$scope: scope});
  }));

  it('should assign saveLifestyle function', function() {
    expect(scope.saveLifestyle).toBeDefined();
  });

  it('should call save correctly when interview.alive == "No"', function() {
    scope.interview.alive = 'No';
    spyOn(scope, 'save');
    scope.saveLifestyle(true);
    expect(scope.save).toHaveBeenCalledWith(true, 'nothanks');
  });

  it('should call save correctly when required answers are defined and interview.alive == "Yes"', function() {
    scope.interview.sports = 'Yes';
    scope.interview.risk_taker = 'No';
    scope.interview.alive = 'Yes';
    spyOn(scope, 'save');
    scope.saveLifestyle(true);
    expect(scope.save).toHaveBeenCalledWith(true, 'interview.quote');
  });
});
