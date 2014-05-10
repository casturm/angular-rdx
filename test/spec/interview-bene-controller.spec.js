describe('rdx.interview.InterviewBeneController', function() {
  var scope;

  beforeEach(module('rdx.interview'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.interview = {};
    scope.save = function(isValid) {};
    $controller('InterviewBeneController', {$scope: scope});
  }));

  it('should assign saveBene function', function() {
    expect(scope.saveBene).toBeDefined();
  });

  it('should call save correctly', function() {
    spyOn(scope, 'save');
    scope.saveBene(true);
    expect(scope.save).toHaveBeenCalledWith(true, 'interview.review');
  });

  it('should assign types', function() {
    expect(scope.types).toEqual([
      {name: 'Person', value: 'person'},
      {name: 'Trust', value: 'trust'}
    ]);
  });

  it('should not assign beneficiary_type when no matching value is found in types', function() {
    expect(scope.interview.beneficiary_type).toBeUndefined();
  });

  describe('with existing interview.beneficiary_type', function() {

    beforeEach(inject(function($controller) {
      scope.interview.beneficiary_type = 'trust';
      $controller('InterviewBeneController', {$scope: scope});
    }));

    it('should assign beneficiary_type when a matching value is found is types', function() {
      expect(scope.interview.beneficiary_type).toEqual({name: 'Trust', value: 'trust'});
    });
  });
});
