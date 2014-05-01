angular.module('rdx.cases')

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('cases', {
      url: '/cases',
      abstract: true,
      templateUrl: 'cases/cases.html',
      controller: 'CasesController'
    })

    .state('cases.list', {
      url: '',
      templateUrl: 'cases/cases.list.html'
    })

    .state('cases.detail', {
      url: '/{caseId:[0-9]{1,4}}',
      views: {
        '': {
          templateUrl: 'cases/cases.detail.html',
          controller: ['$scope', '$stateParams', 'Cases',
            function ($scope, $stateParams, Cases) {
              $scope.case = Cases.findById($scope.cases, $stateParams.caseId);
            }]
        }
      }
    })

    .state('cases.detail.item', {
      url: '/item/:itemId',
      views: {
        '': {
          templateUrl: 'cases/cases.detail.item.html',
          controller: ['$scope', '$stateParams', 'Cases', function($scope, $stateParams, Cases) {
            $scope.itemId = $stateParams.itemId;
            $scope.item = $scope.case[$stateParams.itemId];
          }]
        }
      }
    })
}]);
