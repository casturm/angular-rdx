angular.module('rdx', [
  //'rdx.cases.service',
  'rdx.cases.controller',
  'rdx.cases',
  'ui.router'
])

.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
    })

    .state('about', {
      url: '/about',
      template: '<div class="jumbotron text-center"><h1>It\'s about Life Insurance</h1></div>'
    });
}]);

angular.module('rdx.cases.controller', [
])

.controller('interview', ['$scope', function($scope) {
  console.log("init interview controller");

  $scope.save = function(isValid, nextStep) {
    $scope.submitted = true;

    if (isValid) {
      //cases.post();
      $scope.submitted = false;
      $scope.$state.go(nextStep);
    }
  };
}]);


angular.module('rdx.cases', [
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('interview', {
        abstract: true,
        url: '/interview',
        templateUrl: 'interview/interview.html',
        controller: 'interview'
      })

      .state('interview.step1', {
        url: '',
        templateUrl: 'interview/step1.html'
      })

      .state('interview.step2', {
        url: '',
        templateUrl: 'interview/step2.html'
      })

      .state('interview.thankyou', {
        url: '',
        template: '<div class="jumbotron text-center"><h1>Thank You!</h1><p>Your loved ones will thank you</p></div>'
      });
}]);


