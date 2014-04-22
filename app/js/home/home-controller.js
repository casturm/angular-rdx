angular.module('rdx.home.controllers', [

])

.controller('home-controller', ['$scope', 'Cases', function($scope, Cases) {
  Cases.all();

  $scope.start = function() {
    Cases.start_interview();
    $scope.$state.go('interview.step1');
  }
}]);
