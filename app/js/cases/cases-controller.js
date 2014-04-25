angular.module('rdx.cases')

.controller('CasesController', ['$scope', 'case_list', function($scope, case_list) {
  $scope.cases = case_list;
}]);
