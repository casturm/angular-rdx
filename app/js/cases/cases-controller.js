angular.module('rdx.cases.controllers', [

])

.controller('CasesController', ['$scope', 'Cases', function($scope, Cases) {
  $scope.cases = Cases.cases();
}]);
