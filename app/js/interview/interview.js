angular.module('rdx.interview')

.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('interview', {
        abstract: true,
        url: '/interview',
        templateUrl: 'interview/interview.html',
        controller: 'InterviewController'
      })

      .state('interview.step1', {
        url: '',
        breadcrumb: 'Who Are You?',
        pageHeader: "Who Are You?",
        views: {
          '': {
            templateUrl: 'interview/interview.step1.html',
            controller: 'InterviewStep1Controller'
          },

          'hint@': {
            template: 'You can trust us.  Give us your personal identification information please.'
          }
        }
      })

      .state('interview.step2', {
        url: '',
        breadcrumb: 'Who Wins?',
        pageHeader: "Who Gets Your Stuff?",
        views: {
          '': {
            templateUrl: 'interview/interview.step2.html',
            controller: 'InterviewStep2Controller'
          },

          'hint@': {
            template: 'We want your loved ones to benefit from your passing.  Tell us who gets the stuff.'
          }
        }
      })

      .state('interview.step3', {
        url: '',
        breadcrumb: 'About You',
        pageHeader: "Tell Us About Yourself",
        views: {
          '': {
            templateUrl: 'interview/interview.step3.html'
          },

          'hint@': {
            template: 'Tell us a little bit more about how you live your life.'
          }
        }
      })

      .state('interview.step4', {
        url: '',
        breadcrumb: 'More About You',
        pageHeader: "Still More About You",
        views: {
          '': {
            templateUrl: 'interview/interview.step4.html'
          },

          'hint@': {
            template: 'One more question ... we promise.'
          }
        }
      })

      .state('interview.quote', {
        url: '',
        breadcrumb: 'Your Quote',
        pageHeader: "Choose Your Coverage Amount",
        views: {
          '': {
            templateUrl: 'interview/interview.quote.html',
            controller: 'InterviewStep4Controller'
          },

          'hint@': {
            template: 'Think about it and pick a number.'
          }
        }
      });
}]);


