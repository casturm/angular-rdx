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
        breadcrumb: 'About You',
        pageTitle: "Something About You",
        pageLine: "Tell us a little about yourself to help us customize your coverage options",
        views: {
          '': {
            templateUrl: 'interview/interview.step1.html',
            controller: 'InterviewStep1Controller'
          },

          'hint@': {
            template: '<p>Before you begin, you may want to gather the following list to help you complete your application:</p>  <ul><li>Your name and birthdate</li><li>Your budget</li><li>Your beneficiaries</li>'
          }
        }
      })

      .state('interview.bene', {
        url: '',
        breadcrumb: 'Beneficiaries',
        pageTitle: "Who Gets Your Stuff?",
        pageLine: "Tell us a little about the people you select to receive your policy benefit",
        views: {
          '': {
            templateUrl: 'interview/interview.bene.html',
            controller: 'InterviewBeneController'
          },

          'hint@': {
            template: 'We want your loved ones to benefit from your passing.  Tell us who gets the stuff. You may also select a contingent beneficiary if you choose. Once your policy is in force you may make changes to your beneficiary selection at any time'
          }
        }
      })

      .state('interview.about-you', {
        url: '',
        breadcrumb: 'Lifestyle',
        pageTitle: "A Few Quick LifeStyle Questions",
        pageLine: "This should only take a minute",
        views: {
          '': {
            templateUrl: 'interview/interview.about-you.html',
            controller: 'InterviewAboutYouController'
          },

          'hint@': {
            template: 'Tell us a little bit more about how you live your life. This should only take a minute. Please tell the truth.'
          }
        }
      })

      .state('interview.review', {
        url: '',
        breadcrumb: 'Review',
        pageTitle: "Please Review Your Coverage",
        pageLine: "Confirm your coverage and payment frequency",
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
        pageTitle: "Choose Your Coverage",
        pageLine: "Select your coverage amount, term length and premium",
        views: {
          '': {
            templateUrl: 'interview/interview.quote.html',
            controller: 'InterviewQuoteController'
          },

          'hint@': {
            template: '<p>When selecting your coverage amount consider:</p> <ul> <li>your mortgage, outstanding debt</li> <li>living expenses for your dependents</li> <li>final expenses</li> </ul>'
          }
        }
      });
}]);


