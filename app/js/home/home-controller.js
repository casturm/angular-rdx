angular.module('rdx.home.controllers', [

])

.controller('HomeController', ['$scope', 'Cases', function($scope, Cases) {
  Cases.all();

  $scope.start = function() {
    Cases.start_interview();
    $scope.$state.go('interview.step1');
  }
}]);
