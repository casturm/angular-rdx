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
          $scope.breadcrumbs = [
            $scope.$state.get('interview.step1'),
            $scope.$state.get('interview.step2'),
            $scope.$state.get('interview.step3'),
            $scope.$state.get('interview.step4')
          ];

          $scope.interview = cases.current();

          $scope.save = function(isValid, nextStep) {
            $scope.submitted = true;

            if (isValid) {
              cases.save_current();
              $scope.submitted = false;
              $scope.$state.go(nextStep);
            }
          };

          $scope.pageHeader = function() {
            return $scope.$state.current.pageHeader;
          }
        }]
      })

      .state('interview.step1', {
        url: '',
        breadcrumb: 'Who Are You?',
        pageHeader: "Who Are You?",
        templateUrl: 'interview/interview.step1.html',
        controller: ['$scope', function($scope) {

          $scope.phone_parts = {};
          if ($scope.interview.phone_number) {
            $scope.phone_parts['area'] = $scope.interview.phone_number.substr(0,3);
            $scope.phone_parts['exchange'] = $scope.interview.phone_number.substr(4,3);
            $scope.phone_parts['subscriber'] = $scope.interview.phone_number.substr(5,4);
          }

          $scope.phoneNumberParts = function() {
            var phone_number = ($scope.phone_parts.area || '') + ($scope.phone_parts.exchange || '') + ($scope.phone_parts.subscriber || '');
            if (phone_number.length > 0 && phone_number.length != 10) {
              return true;
            }
            $scope.interview.phone_number = phone_number;
            return false;
          };
        }]
      })

      .state('interview.step2', {
        url: '',
        templateUrl: 'interview/interview.step2.html',
        breadcrumb: 'Who Wins?',
        pageHeader: "Who Gets Your Stuff?",
        controller: ['$scope', function($scope) {

          $scope.types = [
            {name: 'Person', value: 'person'},
            {name: 'Trust', value: 'trust'}
          ];

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
        breadcrumb: 'About You',
        pageHeader: "Tell Us About Yourself"
      })

      .state('interview.step4', {
        url: '',
        templateUrl: 'interview/interview.step4.html',
        breadcrumb: 'More About You',
        pageHeader: "Still More About You",
        controller: ['$scope', function($scope) {

          $scope.finish = function(isValid) {
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


