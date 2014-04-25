angular.module('rdx.home', []);
angular.module('rdx.cases', ['ui.router']);
angular.module('rdx.interview', ['ui.router']);

angular.module('rdx', [
  'rdx.home',
  'rdx.cases',
  'rdx.interview',
  'ui.router',
  'ngAnimate'
])

.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/partial-home.html',
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
      template: '<div class="jumbotron text-center"><h1>It\'s about Life Insurance</h1></div>'
    });
}]);


