angular.module('rdx.auth')

.factory('AuthService', ['$rootScope', 'authService', '$http', '$cacheFactory', function($rootScope, authService, $http, $cacheFactory) {
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
    }
  };
  return auth;
}])

.factory('authInterceptor', ['$cacheFactory', '$rootScope', function ($cacheFactory, $rootScope) {
  var cache = $cacheFactory('auth');
  $rootScope.$on('event:auth-loginConfirmed', function(event, data) {
    console.log('loginConfirmed ' + angular.toJson(data));
    cache.put('token', data.token);
  });
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (cache.get('token')) {
        config.headers.Authorization = 'Bearer ' + cache.get('token');
      }
      console.log('request ' + angular.toJson(config));
      return config;
    }
  };
}])

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
