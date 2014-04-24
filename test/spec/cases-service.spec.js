describe('rdx.cases.Cases', function(){
  var $httpBackend, Cases;

  beforeEach(module('rdx.cases'));

  beforeEach(inject(function(_$httpBackend_, _Cases_) {
    Cases = _Cases_;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('assets/cases.json').
      respond({cases:[{id: 1, name: 'bob'}]});
  }));

  it('can get all the static cases from server and cache them', function() {
    expect(Cases.cases()).toEqual([]);
    Cases.all();

    $httpBackend.flush();

    expect(Cases.cases()).toEqual([{id: 1, name: 'bob'}]);
  });

  it('can create a new interview and add it to the cache of cases', function() {
    Cases.start_interview();
    expect(Cases.current()).toEqual({ id: 2 });
  });

});
