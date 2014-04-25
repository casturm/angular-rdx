angular.module('rdx.cases')

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('cases', {
      url: '/cases',
      abstract: true,
      templateUrl: 'cases/cases.html',
      resolve: {
        case_list: ['Cases', function(Cases) {
          return Cases.all();
        }]
      },
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
              $scope.case = Cases.findById($stateParams.caseId);
            }]
        }
      }
    })

    .state('cases.detail.item', {
      url: '/item/:itemId',
      views: {
        '': {
          template: '<div class="slide"><h4>{{itemId}} <button class="btn">Edit</button></h4><div>{{item}}</div></div>',
          controller: ['$scope', '$stateParams', 'Cases', function($scope, $stateParams, Cases) {
            $scope.itemId = $stateParams.itemId;
            $scope.item = $scope.case[$stateParams.itemId];
          }]
        }
      }
    })
}]);
