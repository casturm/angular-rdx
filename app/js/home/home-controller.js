angular.module('rdx.home.controllers', [

])

.controller('home-controller', ['$scope', 'cases', function($scope, cases) {
  cases.all();

  $scope.start = function() {
    cases.start_interview();
    $scope.$state.go('interview.step1');
  }
}]);
