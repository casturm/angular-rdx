angular.module('rdx.home')

.controller('HomeController', ['$scope', 'Interview', function($scope, Interview) {
  $scope.start = function() {
    Interview.create().then(function() {
      $scope.$state.go('interview.about-you');
    });
  }
}]);
