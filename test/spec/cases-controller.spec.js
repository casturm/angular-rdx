describe('rdx.cases.CasesController', function() {
  var scope, cases;

  beforeEach(module('rdx.cases'));

  beforeEach(module(function ($provide) {
    Cases = {
      cases: function() {
        return [{id:'1',name:'bob'},{id:'2',name:'mary'}];
      }
    };
    $provide.value('Cases', Cases);
  }));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('CasesController', {$scope: scope, Cases: Cases});
  }));

  it('should get all the cases an put them on the scope', function() {
    expect(scope.cases).toEqual([{id:'1',name:'bob'},{id:'2',name:'mary'}]);
  });
});
