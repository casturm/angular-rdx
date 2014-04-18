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
          cases: 'cases'
        },
        controller: ['$scope', 'cases', function($scope, cases) {
          $scope.breadcrumbs = [$scope.$state.get('interview.step1'), $scope.$state.get('interview.step2'), $scope.$state.get('interview.step3'), $scope.$state.get('interview.step4')];
          $scope.interview = cases.current();

          $scope.save = function(isValid, nextStep) {
            $scope.submitted = true;

            if (isValid) {
              cases.save_current();
              $scope.submitted = false;
              $scope.$state.go(nextStep);
            }
          };

          $scope.complete = function(step) {
            if (step == 'interview.step1') {
              return true;
            }
            else {
              return false;
            }
          }
        }]
      })

      .state('interview.step1', {
        url: '',
        displayName: 'Who Are You?',
        templateUrl: 'interview/interview.step1.html'
      })

      .state('interview.step2', {
        url: '',
        templateUrl: 'interview/interview.step2.html',
        displayName: 'Who Wins?',
        controller: ['$scope', function($scope) {
          $scope.types = [
            {name: 'Person', value: 'person'},
            {name: 'Trust', value: 'trust'}
          ];
          // Todo put this in utils
          for (index = 0; index < $scope.types.length; ++index) {
            if ($scope.interview.beneficiary_type == $scope.types[index].value) {
              $scope.interview.beneficiary_type = $scope.types[index];
            }
          }
        }]
      })

      .state('interview.step3', {
        url: '',
        templateUrl: 'interview/interview.step3.html',
        displayName: 'About You'
      })

      .state('interview.step4', {
        url: '',
        templateUrl: 'interview/interview.step4.html',
        displayName: 'More About You',
        controller: ['$scope', function($scope) {
          $scope.finish = function(isValid) {
            console.log($scope.interview.alive);
            if ($scope.interview.alive == 'No') {
              $scope.save(isValid, 'nothanks');
            }
            else {
              $scope.save(isValid, 'thankyou');
            }
          };
        }]
      });
}]);


