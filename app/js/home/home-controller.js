angular.module('rdx.home')

.controller('HomeController', ['$scope', 'Cases', function($scope, Cases) {
  $scope.start = function() {
    Cases.start_interview();
    $scope.$state.go('interview.step1');
  }
}]);
