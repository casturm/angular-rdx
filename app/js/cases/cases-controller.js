angular.module('rdx.cases')

.controller('CasesController', ['$scope', 'Cases', function($scope, Cases) {
  Cases.all().then(function(cases) {
    $scope.cases = cases;
  });
}]);
