angular.module('rdx.cases')

.factory('Cases', ['$http', function ($http) {
  var path = 'assets/cases.json';
  var cases = [];
  var next_id = 2;
  var cases_promise = $http.get(path).then(function (resp) {
    cases = resp.data.cases;
    return cases;
  });

  var factory = {};
  factory.start_interview = function() {
    cases.unshift({ id: next_id++ });
  };
  factory.current = function() {
    return cases[0];
  };
  factory.save_current = function() {
    console.log("save current case: " + angular.toJson(cases[0]));
    $http.post('cases', angular.toJson(cases[0])).then(function (resp) {
      console.log('post response: ' + angular.toJson(resp.data));
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

