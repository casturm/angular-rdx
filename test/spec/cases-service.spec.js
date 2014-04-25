describe('rdx.cases.Cases', function(){
  var $httpBackend, Cases;

  beforeEach(module('rdx.cases'));

  beforeEach(inject(function(_$httpBackend_, $injector) {
    Cases = $injector.get('Cases');
    $httpBackend = _$httpBackend_;
  }));

  it('can get all the static cases from server and cache them', function() {
    $httpBackend.expectGET('assets/cases.json').
      respond({'cases':[{'id': 1, 'name': 'bob'}]});
    expect(Cases.cases()).toEqual([]);

    var cases = [];
    Cases.all().then(function(data) {
      cases = data;
    });

    $httpBackend.flush();

    expect(cases).toEqual([{'id': 1, 'name': 'bob'}]);
    expect(Cases.cases()).toEqual(cases);
  });

  it('can create a new interview and add it to the cache of cases', function() {
    Cases.start_interview();
    expect(Cases.current()).toEqual({ id: 2 });
  });

});
