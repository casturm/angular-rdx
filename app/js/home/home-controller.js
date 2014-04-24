angular.module('rdx.home')

.controller('HomeController', ['$scope', 'Cases', function($scope, Cases) {
  // see http://stackoverflow.com/questions/20433485/angular-ui-router-unit-testing-states-to-urls
  // for a way to put this call into the resolve block of the state config.  may require using a spy
  // in the test instead of stubbing out the method.
  Cases.all();

  $scope.start = function() {
    Cases.start_interview();
    $scope.$state.go('interview.step1');
  }
}]);
