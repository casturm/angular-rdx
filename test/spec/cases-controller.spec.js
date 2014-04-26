describe('rdx.cases.CasesController', function() {
  var rootScope, scope, Cases;

  beforeEach(module('rdx.cases'));

  beforeEach(module(function ($provide) {
    Cases = {
      all: function() {}
    };
    $provide.value('Cases', Cases);
  }));

  beforeEach(inject(function($rootScope, $q, $controller) {
    var deferred = $q.defer();
    rootScope = $rootScope;
    scope = $rootScope.$new();

    deferred.resolve([{id:'1',name:'bob'},{id:'2',name:'mary'}]);
    spyOn(Cases, 'all').andReturn(deferred.promise);
    $controller('CasesController', {$scope: scope, Cases: Cases});
  }));

  it('should get all the cases an put them on the scope', function() {
    Cases.all();
    rootScope.$apply();
    expect(scope.cases).toEqual([{id:'1',name:'bob'},{id:'2',name:'mary'}]);
  });
});
