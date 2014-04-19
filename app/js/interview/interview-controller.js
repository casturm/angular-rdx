angular.module('rdx.interview.controllers', [

])

.controller('interview-controller', ['$scope', 'cases', function($scope, cases) {
  $scope.breadcrumbs = [
    $scope.$state.get('interview.step1'),
    $scope.$state.get('interview.step2'),
    $scope.$state.get('interview.step3'),
    $scope.$state.get('interview.step4')
  ];

  $scope.interview = cases.current();

  $scope.save = function(isValid, nextStep) {
    $scope.submitted = true;

    if (isValid) {
      cases.save_current();
      $scope.submitted = false;
      $scope.$state.go(nextStep);
    }
  };

  $scope.pageHeader = function() {
    return $scope.$state.current.pageHeader;
  }
}]);


