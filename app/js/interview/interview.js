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

      .state('interview.bene', {
        url: '',
        breadcrumb: 'Who Wins?',
        pageHeader: "Who Gets Your Stuff?",
        views: {
          '': {
            templateUrl: 'interview/interview.bene.html',
            controller: 'InterviewBeneController'
          },

          'hint@': {
            template: 'We want your loved ones to benefit from your passing.  Tell us who gets the stuff.'
          }
        }
      })

      .state('interview.about-you', {
        url: '',
        breadcrumb: 'About You',
        pageHeader: "Tell Us About Yourself",
        views: {
          '': {
            templateUrl: 'interview/interview.about-you.html',
            controller: 'InterviewAboutYouController'
          },

          'hint@': {
            template: 'Tell us a little bit more about how you live your life.'
          }
        }
      })

      .state('interview.review', {
        url: '',
        breadcrumb: 'Review',
        pageHeader: "Let's Review",
        views: {
          '': {
            templateUrl: 'interview/interview.review.html',
            controller: 'InterviewReviewController'
          },

          'hint@': {
            template: 'Time to review your information and submit your application.'
          }
        }
      })

      .state('interview.quote', {
        url: '',
        breadcrumb: 'Your Quote',
        pageHeader: "Monthly Premiums",
        views: {
          '': {
            templateUrl: 'interview/interview.quote.html',
            controller: 'InterviewQuoteController'
          },

          'hint@': {
            template: 'Think about it and pick a number.'
          }
        }
      });
}]);


