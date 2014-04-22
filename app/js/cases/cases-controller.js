angular.module('rdx.cases.controllers', [

])

.controller('cases-controller', ['$scope', 'Cases', function($scope, Cases) {
  $scope.cases = Cases.cases();
}]);
