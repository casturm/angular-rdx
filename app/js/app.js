angular.module('rdx.home', []);
angular.module('rdx.cases', []);
angular.module('rdx.interview', ['ui.router']);

angular.module('rdx', [
  'rdx.home',
  'rdx.cases',
  'rdx.interview',
  'ui.router'
])

.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope
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

    .state('cases', {
      url: '/cases',
      templateUrl: 'cases/cases.list.html',
      controller: 'CasesController',
      resolve: {
        case_list: ['Cases', function(Cases) {
          return Cases.all();
        }]
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
      template: '<div class="jumbotron text-center"><h1>It\'s about Life Insurance</h1></div>'
    });
}]);


