var app = angular.module('app', ['ui.router']);

app.controller('MainCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.save = function(isValid) {
    if (isValid) {
      alert('save');
      $state.go('step2');
    }
  };
}]);

app.factory('Cases', ['$http', function($http) {
  return {
    post: function() {
      alert('post');
//      $http.post('/api/case', $scope.userForm.fields);
    }
  };
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html'
    })

    .state('step1', {
      url: '/step1',
      templateUrl: 'partial-step1.html',
      controller: 'MainCtrl'
    })

    .state('step2', {
      url: '/step2',
      templateUrl: 'partial-step2.html',
      controller: 'MainCtrl'
    })

    .state('step3', {
      url: '/step3',
      template: "<div class'jumbotron'>Thank You!</div>"
    })

    .state('about', {
    });
}]);
