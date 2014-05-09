angular.module('rdx.users')

.controller('LoginController', ['$rootScope', '$scope', '$modal', function($rootScope, $scope, $modal) {

  $scope.user = {};

  $rootScope.$on('event:auth-loginRequired', function() {
    console.log('loginRequired');
    show();
  });

  show = function() {
    var modalInstance = $modal.open({
      templateUrl: 'loginModalContent.html',
      controller: 'LoginModalController',
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function () {
      console.log('Modal closed at: ' + new Date());
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
      $scope.$state.go('home');
    });
  };
}])

.controller('LoginModalController', ['$scope', '$modalInstance', 'AuthService', 'user', function($scope, $modalInstance, AuthService, user) {
  $scope.message = '';
  $scope.submitted = false;

  $scope.user = user;

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
    $modalInstance.close();
  };

  error = function(resp) {
    console.log('AuthService.authenticate failure resp: ' + angular.toJson(resp));
    if (resp.data != undefined) {
      $scope.user.password = '';
      $scope.message = resp.data;
    }
  };
}]);

