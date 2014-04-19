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
}])

.controller('interview-step2-controller', ['$scope', function($scope) {

  $scope.types = [
    {name: 'Person', value: 'person'},
    {name: 'Trust', value: 'trust'}
  ];

  for (index = 0; index < $scope.types.length; ++index) {
    if ($scope.interview.beneficiary_type == $scope.types[index].value) {
      $scope.interview.beneficiary_type = $scope.types[index];
    }
  }
}])

.controller('interview-step4-controller', ['$scope', function($scope) {

  $scope.finish = function(isValid) {
    if ($scope.interview.alive == 'No') {
      $scope.save(isValid, 'nothanks');
    }
    else {
      $scope.save(isValid, 'thankyou');
    }
  };
}]);
