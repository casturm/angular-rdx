angular.module('rdx.users')

.controller('UserController', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.message = '';
  $scope.submit = function() {
    AuthService.authenticate($scope.user);
  };
}]);


