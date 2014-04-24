describe('rdx.interview.InterviewStep2Controller', function() {
  var scope;

  beforeEach(module('rdx.interview'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.interview = {};
    $controller('InterviewStep2Controller', {$scope: scope});
  }));

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
      $controller('InterviewStep2Controller', {$scope: scope});
    }));

    it('should assign beneficiary_type when a matching value is found is types', function() {
      expect(scope.interview.beneficiary_type).toEqual({name: 'Trust', value: 'trust'});
    });
  });
});
