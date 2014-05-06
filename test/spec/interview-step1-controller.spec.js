describe('rdx.interview.InterviewStep1Controller', function() {
  var scope;

  beforeEach(module('rdx.interview'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.interview = {};
    $controller('InterviewStep1Controller', {$scope: scope});
  }));

  it('should assign phoneNumberParts method', function() {
    expect(angular.isFunction(scope.phoneNumberParts)).toBe(true);
  });

  it('should assign an empty object to phone_parts', function() {
    expect(scope.phone_parts).toEqual({});
  });

  it('should assign $scope.phone_number when phoneNumberParts() is called', function() {
    scope.phone_parts = {area:'202',exchange:'543',subscriber:'8967'};
    scope.phoneNumberParts();
    expect(scope.phone_number).toEqual('2025438967');
  });

  describe('scope.savePersonalInfo()', function() {
    beforeEach(function() {
      scope.save = function() {}
    });

    it('should be defined', function() {
      expect(scope.savePersonalInfo).toBeDefined();
    });

    it('should set interview.phone_number if scope.phone_number is defined', function() {
      scope.phone_number = '1234567890';
      spyOn(scope, 'save');
      scope.savePersonalInfo(true);
      expect(scope.save).toHaveBeenCalledWith(true, 'interview.step2');
    });
  });
});
