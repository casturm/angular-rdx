angular.module('rdx.interview')

.controller('InterviewStep1Controller', ['$scope', function($scope) {

  $scope.phone_parts = {};

  $scope.phoneNumberParts = function() {
    $scope.phone_number = ($scope.phone_parts.area || '') + ($scope.phone_parts.exchange || '') + ($scope.phone_parts.subscriber || '');
    return $scope.phone_number.length > 0 && $scope.phone_number.length != 10;
  };
}])

.controller('InterviewStep2Controller', ['$scope', function($scope) {

  $scope.types = [
    {name: 'Person', value: 'person'},
    {name: 'Trust', value: 'trust'}
  ];

  angular.forEach($scope.types, function(type) {
    if ($scope.interview.beneficiary_type == type.value) {
      $scope.interview.beneficiary_type = type;
    }
  });
}])

.controller('InterviewStep4Controller', ['$scope', function($scope) {

  $scope.finish = function(isValid) {
    if ($scope.interview.alive == 'No') {
      $scope.save(isValid, 'nothanks');
    }
    else {
      $scope.save(isValid, 'thankyou');
    }
  };
}]);
