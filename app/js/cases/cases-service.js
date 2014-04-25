angular.module('rdx.cases')

.factory('Cases', ['$http', function ($http) {
  var path = 'assets/cases.json';
  var cases = [];
  var cases_promise = $http.get(path).then(function(resp) {
    console.log('get cases: ' + angular.toJson(cases.concat(resp.data.cases)));
    return cases = cases.concat(resp.data.cases);
  });

  var factory = {};
  factory.next_id = 2;
  factory.start_interview = function() {
    cases.unshift({ id: this.next_id++ });
  };
  factory.current = function() {
    return cases[0];
  };
  factory.save_current = function() {
    console.log("post current case: " + angular.toJson(cases[0]));
    $http.post('cases', angular.toJson(cases[0])).then(function (resp) {
      console.log('server response: ' + angular.toJson(resp.data));
    });
  };
  factory.cases = function() {
    return cases;
  };
  factory.all = function () {
    return cases_promise;
  };

  return factory;
}]);

