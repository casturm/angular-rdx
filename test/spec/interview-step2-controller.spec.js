describe('rdx.interview.step.controllers', function() {

  describe('interview-step2-controller', function() {
    var scope;

    beforeEach(module('rdx.interview.step.controllers'));
    beforeEach(module('ui.router'));

    beforeEach(function() {
      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.interview = {};
      $controller('interview-step2-controller', {$scope: scope});
    }));

    it('should assign types', function() {
      expect(scope.types).toEqualData([
          {name: 'Person', value: 'person'},
          {name: 'Trust', value: 'trust'}
        ]);
    });

    it('should not assign beneficiary_type when no matching value is found in types', function() {
      expect(scope.interview.beneficiary_type).toBeUndefined();
    });

    describe('interview-step2-controller with existing interview.beneficiary_type', function() {

      beforeEach(inject(function($controller) {
        scope.interview.beneficiary_type = 'trust';
        $controller('interview-step2-controller', {$scope: scope});
      }));

      it('should assign beneficiary_type when a matching value is found is types', function() {
        expect(scope.interview.beneficiary_type).toEqualData({name: 'Trust', value: 'trust'});
      });
    });
  });
});
