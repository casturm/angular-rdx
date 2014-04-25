describe('rdx.cases.CasesController', function() {
  var scope;

  beforeEach(module('rdx.cases'));

  beforeEach(module(function ($provide) {
    var case_list = [{id:'1',name:'bob'},{id:'2',name:'mary'}];
    $provide.value('case_list', case_list);
  }));

  beforeEach(inject(function($rootScope, $controller, case_list) {
    scope = $rootScope.$new();
    $controller('CasesController', {$scope: scope, case_list: case_list});
  }));

  it('should get all the cases an put them on the scope', function() {
    expect(scope.cases).toEqual([{id:'1',name:'bob'},{id:'2',name:'mary'}]);
  });
});
