angular.module('rdx.interview')

.controller('InterviewController', ['$scope', 'Interview', function($scope, Interview) {
  $scope.interview = Interview.current();

  if (angular.isUndefined($scope.interview)) {
    $scope.$state.go('home');
  }

  $scope.submitted = false;

  $scope.breadcrumbs = [
    $scope.$state.get('interview.step1'),
    $scope.$state.get('interview.step2'),
    $scope.$state.get('interview.step3'),
    $scope.$state.get('interview.step4'),
    $scope.$state.get('interview.quote')
  ];

  $scope.save = function(isValid, nextStep) {
    $scope.submitted = true;

    if (isValid) {
      Interview.save();
      $scope.submitted = false;
      $scope.$state.go(nextStep);
    }
  };

  $scope.pageHeader = function() {
    return $scope.$state.current.pageHeader;
  }
}]);


