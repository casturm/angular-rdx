describe('rdx.cases.Cases', function(){
  var $httpBackend, Cases;

  beforeEach(module('rdx.cases'));

  beforeEach(inject(function(_$httpBackend_, _Cases_) {
    Cases = _Cases_;
    $httpBackend = _$httpBackend_;
  }));

  it('can get all the cases', function() {
    var returnedCases = [{id: 1,name: 'bob'}];

    $httpBackend.expectGET('api/cases').respond({cases: returnedCases});

    var casesPromise = Cases.all();

    var cases;
    casesPromise.then(function(resp) {
      cases = resp;
    });

    $httpBackend.flush();

    expect(cases).toEqual(returnedCases);
  });

  it('can find a case by id', function() {
    var returnedCase = {id: 2, name: 'found'};
    var cases = [{id: 1,name: 'bob'}, returnedCase, {id: 3, name: 'fred'}];

    expect(Cases.findById(cases, 2)).toEqual(returnedCase);
  });

});
