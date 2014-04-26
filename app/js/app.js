angular.module('rdx.auth', ['http-auth-interceptor'])
  .factory('TokenHolder', [function() {
    var TokenHolder = {
      save: function(token) {
        console.log('save token: ' + token);
        this._token = token;
      },
      expire: function() {
       delete this._token;
      },
      token: function() {
        return this._token;
      }
    };
    return TokenHolder;
  }])
  .factory('AuthService', ['$rootScope', 'authService', '$http', 'TokenHolder', function($rootScope, authService, $http, TokenHolder) {
    $rootScope.$on('event:auth-loginConfirmed', function(event, data) {
      console.log('loginConfirmed ' + angular.toJson(data));
      TokenHolder.save(data.token);
    });
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
      request: function (config) {
        config.headers = config.headers || {};
        if (this.token) {
          config.headers.Authorization = 'Bearer ' + TokenHolder.token();
        }
        console.log('request ' + angular.toJson(config));
        return config;
      }
    };
    return auth;
  }])
  .factory('authInterceptor', function (TokenHolder) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (TokenHolder.token()) {
          config.headers.Authorization = 'Bearer ' + TokenHolder.token();
        }
        console.log('request ' + angular.toJson(config));
        return config;
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
angular.module('rdx.users', []);
angular.module('rdx.home', []);
angular.module('rdx.cases', ['ui.router']);
angular.module('rdx.interview', ['ui.router']);

angular.module('rdx', [
  'rdx.auth',
  'rdx.users',
  'rdx.home',
  'rdx.cases',
  'rdx.interview',
  'ui.router',
  'http-auth-interceptor',
  'ngAnimate'
])

.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.directive('auth', function() {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {
      //once Angular is started, remove class:
      elem.removeClass('waiting-for-angular');

      var login = $('#login-holder');
      var main = $('#content');

      scope.$on('event:auth-loginRequired', function() {
        login.slideDown('slow', function() {
          main.hide();
        });
      });
      scope.$on('event:auth-loginConfirmed', function() {
        main.show();
        login.slideUp();
      });
    }
  }
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    })

    .state('thankyou', {
      url: '/thankyou',
      template: '<div class="jumbotron text-center"><h1>Thank You!</h1><p>Your loved ones will thank you too.</p></div>'
    })

    .state('nothanks', {
      url: '/thanksbutnothanks',
      template: '<div class="jumbotron text-center"><h1>You Are Dead!</h1><p>Sorry, but we can\'t insure you at this time.</p></div>'
    })

    .state('about', {
      url: '/about',
      template: '<div class="jumbotron text-center"><h1>What Is This?</h1><p>This is an example app based on <a href="https://github.com/angular-ui/ui-router">Angular-UI-Router</a>, <a href="https://angularjs.org/">AngularJS</a>, and <a href="http://getbootstrap.com/">Bootstrap</a></p><p>The server is a simple <a href="http://nodejs.org/">NodeJS</a> app.</p><p>Checkout the code <a href="https://github.com/casturm/angular-rdx">Here</a></p></div>'
    });
}]);


