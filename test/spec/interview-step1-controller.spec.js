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

  describe('with interview.phone_number undefined', function() {

    beforeEach(inject(function($controller) {
      $controller('InterviewStep1Controller', {$scope: scope});
    }));

    it('should assign an empty object to phone_parts', function() {
      expect(scope.phone_parts).toEqual({});
    });
  });

  describe('with intervew.phone_number defined', function() {
    beforeEach(inject(function($controller) {
      scope.interview.phone_number = '2025438967';
      $controller('InterviewStep1Controller', {$scope: scope});
    }));

    it('should assign phone_parts bits', function() {
      expect(scope.phone_parts).toEqual({area:'202',exchange:'543',subscriber:'8967'});
    });
  });

  describe('with phone_parts defined', function() {
    beforeEach(inject(function($controller) {
      $controller('InterviewStep1Controller', {$scope: scope});
      scope.phone_parts = {area:'202',exchange:'543',subscriber:'8967'};
    }));

    it('should assign interview.phone_number when phoneNumberParts is called', function() {
      scope.phoneNumberParts();
      expect(scope.interview.phone_number).toEqual('2025438967');
    });
  });
});
