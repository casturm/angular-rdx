angular.module('rdx.home')

.controller('HomeController', ['$scope', 'Interview', function($scope, Interview) {
  $scope.start = function() {
    Interview.create();
    $scope.$state.go('interview.step1');
  }
}]);
