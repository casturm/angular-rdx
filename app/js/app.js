angular.module('rdx.auth', ['ui.router','http-auth-interceptor']);
angular.module('rdx.users', []);
angular.module('rdx.home', []);
angular.module('rdx.cases', ['ui.router']);
angular.module('rdx.interview', ['ui.router']);
angular.module('rdx.quotes', []);

angular.module('rdx', [
  'rdx.auth',
  'rdx.users',
  'rdx.home',
  'rdx.cases',
  'rdx.interview',
  'rdx.quotes',
  'ui.router',
  'http-auth-interceptor',
  'ngAnimate',
  'ui.date'
])

.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'home/home.html',
      controller: function($scope, $state, AuthService) {
        $state.go('home');
        AuthService.login();
      }
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


