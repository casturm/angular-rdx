angular.module('rdx.users')

.controller('UserController1', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.message = '';
  $scope.submitted = false;

  $scope.submit = function(isValid) {
    $scope.submitted = true;

    if (isValid) {
      AuthService.authenticate($scope.user).then(success, error);
    }
    else if (angular.isUndefined($scope.user.username)) {
      $scope.message = 'Enter your username';
    }
    else if (angular.isUndefined($scope.user.password)) {
      $scope.message = 'Enter your password';
    }
  }

  // ** authentication handlers ** //
  success = function(resp) {
    console.log('AuthService.authenticate success resp: ' + angular.toJson(resp));
    $scope.submitted = false;
  };

  error = function(resp) {
    console.log('AuthService.authenticate failure resp: ' + angular.toJson(resp));
    if (resp.data != undefined) {
      $scope.user.password = '';
      $scope.message = resp.data;
    }
  };
}]);


