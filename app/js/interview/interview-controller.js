angular.module('rdx.interview')

.controller('InterviewController', ['$scope', 'Interview', function($scope, Interview) {
  $scope.interview = Interview.current();

  if (angular.isUndefined($scope.interview)) {
    $scope.$state.go('home');
  }

  $scope.submitted = false;

  $scope.breadcrumbs = [
    $scope.$state.get('interview.step1'),
    $scope.$state.get('interview.lifestyle'),
    $scope.$state.get('interview.quote'),
    $scope.$state.get('interview.bene'),
    $scope.$state.get('interview.review')
  ];

  $scope.save = function(isValid, nextStep) {
    $scope.submitted = true;

    console.log('go to nextStep: ' + nextStep + ' isValid: ' + isValid)
    if (isValid) {
      Interview.save();
      $scope.submitted = false;
      $scope.$state.go(nextStep);
    }
  };

  $scope.pageTitle = function() {
    return $scope.$state.current.pageTitle;
  };

  $scope.pageLine = function() {
    return $scope.$state.current.pageLine;
  };

  $scope.isUndefined = function(value) {
    return angular.isUndefined(value);
  };
}]);


