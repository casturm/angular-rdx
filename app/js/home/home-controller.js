angular.module('rdx.home')

.controller('HomeController', ['$scope', 'Interview', function($scope, Interview) {
  $scope.start = function() {
    Interview.create().then(function() {
      console.log('go to step1');
      $scope.$state.go('interview.step1');
    });
  }
}]);
