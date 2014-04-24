angular.module('rdx.cases')

.controller('CasesController', ['$scope', 'Cases', function($scope, Cases) {
  $scope.cases = Cases.cases();
}]);
