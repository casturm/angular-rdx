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
        templateUrl: 'interview/interview.step1.html',
        controller: 'InterviewStep1Controller'
      })

      .state('interview.step2', {
        url: '',
        templateUrl: 'interview/interview.step2.html',
        breadcrumb: 'Who Wins?',
        pageHeader: "Who Gets Your Stuff?",
        controller: 'InterviewStep2Controller'
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
        controller: 'InterviewStep4Controller'
      });
}]);


