angular.module('rdx.interview.controllers', [

])

.controller('interview-controller', ['$scope', 'Cases', function($scope, Cases) {
  $scope.breadcrumbs = [
    $scope.$state.get('interview.step1'),
    $scope.$state.get('interview.step2'),
    $scope.$state.get('interview.step3'),
    $scope.$state.get('interview.step4')
  ];

  $scope.interview = Cases.current();

  $scope.save = function(isValid, nextStep) {
    $scope.submitted = true;

    if (isValid) {
      Cases.save_current();
      $scope.submitted = false;
      $scope.$state.go(nextStep);
    }
  };

  $scope.pageHeader = function() {
    return $scope.$state.current.pageHeader;
  }
}]);


