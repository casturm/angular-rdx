angular.module('rdx.auth')

.directive('auth', function() {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {
      var login = $('#login-holder');
      var main = $('#content');

      scope.$on('event:auth-loginRequired', function() {
        login.slideDown('slow', function() {
          main.hide();
        });
      });
      scope.$on('event:auth-loginConfirmed', function() {
        main.show();
        login.slideUp();
      });
    }
  }
});


