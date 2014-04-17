angular.module('rdx', [
  'rdx.cases.service',
  'rdx.interview',
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
      templateUrl: 'partial-home.html',
      resolve: {
        cases: ['cases',
          function(cases) {
            return cases.all();
          }
        ],
        cases_service: 'cases'
      },
      controller: ['$scope', 'cases', 'cases_service', function($scope, cases, cases_service) {
        $scope.start = function() {
          cases_service.start_interview();
          $scope.$state.go('interview.step1');
        }
      }]
    })

    .state('cases', {
      url: '/cases',
      templateUrl: 'cases.list.html',
      resolve: {
        cases: 'cases'
      },
      controller: ['$scope', 'cases', function($scope, cases) {
        $scope.cases = cases.current();
      }]
    })

    .state('about', {
      url: '/about',
      template: '<div class="jumbotron text-center"><h1>It\'s about Life Insurance</h1></div>'
    });
}]);


angular.module('rdx.cases.service', [

])

.factory('cases', ['$http', function ($http) {
  var path = 'assets/cases.json';
  var the_cases = [];
  var next_id = 2;
  var cases = $http.get(path).then(function (resp) {
    the_cases = resp.data.cases;
    return the_cases;
  });

  var factory = {};
  factory.start_interview = function() {
    the_cases.unshift({
      id: next_id++,
      name: '',
      username: '',
      email: '',
      phone_area: '',
      phone_exchange: '',
      phone_subscriber: '',
      beneficiary_type: '',
      beneficiary_name: '',
      alive: '',
      risk_taker: '',
      risk_kind: ''
    });
  };
  factory.current = function() {
    return the_cases;
  };
  factory.all = function () {
    return cases;
  };
  return factory;
}]);


angular.module('rdx.interview', [
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('interview', {
        abstract: true,
        url: '/interview',
        templateUrl: 'interview/interview.html',
        resolve: {
          cases: ['cases',
            function(cases) {
              return cases.all();
            }
          ]
        },
        controller: ['$scope', 'cases', function($scope, cases) {
          $scope.interview = cases[0];

          $scope.save = function(isValid, nextStep) {
            $scope.submitted = true;

            if (isValid) {
              $scope.submitted = false;
              $scope.$state.go(nextStep);
            }
          };
        }]
      })

      .state('interview.step1', {
        url: '',
        templateUrl: 'interview/step1.html'
      })

      .state('interview.step2', {
        url: '',
        templateUrl: 'interview/step2.html',
        controller: ['$scope', function($scope) {
          $scope.types = [
            {name: 'Person', value: 'person'},
            {name: 'Trust', value: 'trust'}
          ];
        }]
      })

      .state('interview.step3', {
        url: '',
        templateUrl: 'interview/step3.html'
      })

      .state('interview.thankyou', {
        url: '',
        template: '<div class="jumbotron text-center"><h1>Thank You!</h1><p>Your loved ones will thank you too.</p></div>'
      });
}]);


