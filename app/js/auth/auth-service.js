angular.module('rdx.auth')

.factory('AuthService', ['$rootScope', 'authService', '$http', function($rootScope, authService, $http) {
  var auth = {
    authenticate: function(user) {
      console.log('autenthicate: ' + angular.toJson(user));
      $http
      .post('/authenticate', user)
      .success(function(data, status, headers, config) {
        $rootScope.user = {name: data.profile.first_name};
        console.log('authenticate response: ' + angular.toJson(data));
        authService.loginConfirmed(data);
      })
    },
    login: function() {
      $rootScope.$broadcast('event:auth-loginRequired');
    }
  };
  return auth;
}])

.factory('authInterceptor', ['$rootScope', function ($rootScope) {
  var token;
  $rootScope.$on('event:auth-loginConfirmed', function(event, data) {
    console.log('loginConfirmed ' + angular.toJson(data));
    token = data.token;
  });
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      console.log('request ' + angular.toJson(config));
      return config;
    }
  };
}])

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
