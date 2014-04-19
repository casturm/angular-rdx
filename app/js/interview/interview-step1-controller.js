angular.module('rdx.interview.step.controllers', [

])

.controller('interview-step1-controller', ['$scope', function($scope) {

  $scope.phone_parts = {};
  if ($scope.interview.phone_number) {
    $scope.phone_parts['area'] = $scope.interview.phone_number.substr(0,3);
    $scope.phone_parts['exchange'] = $scope.interview.phone_number.substr(4,3);
    $scope.phone_parts['subscriber'] = $scope.interview.phone_number.substr(5,4);
  }

  $scope.phoneNumberParts = function() {
    var phone_number = ($scope.phone_parts.area || '') + ($scope.phone_parts.exchange || '') + ($scope.phone_parts.subscriber || '');
    if (phone_number.length > 0 && phone_number.length != 10) {
      return true;
    }
    $scope.interview.phone_number = phone_number;
    return false;
  };
}]);

