angular.module('rdx.cases.controllers', [

])

.controller('cases-controller', ['$scope', 'cases', function($scope, cases) {
  $scope.cases = cases.cases();
}]);
