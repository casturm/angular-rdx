angular.module('rdx.cases')

.factory('Cases', ['$http', function ($http) {
  var factory = {};
  factory.all = function () {
    console.log('get casess');
    return $http.get('api/cases').then(function(resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return resp.data.cases;
    });
  };
  factory.findById = function(cases, id) {
    found_case = [];
    angular.forEach(cases, function(c) {
      if (c.id == id) {
        found_case.push(c);
      }
    }, found_case);
    return found_case[0];
  };
  return factory;
}])

.factory('Interview', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
  var cache = $cacheFactory('cacheId');
  var factory = {};
  factory.current = function() {
    return cache.get('current');
  };
  factory.create = function() {
    $http.post('api/interview').then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      cache.put('current', resp.data);
    });
  };
  factory.save = function() {
    var interview = cache.get('current');
    console.log("put current interview: " + angular.toJson(interview));
    return $http.put('api/interview', interview).then(function (resp) {
      console.log('  server response: ' + angular.toJson(resp.data));
      return cache.get('interview');
    });
  };
  return factory;
}]);

