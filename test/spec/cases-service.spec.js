describe('rdx.cases.services', function() {

  describe('cases', function(){
    var $httpBackend;

    beforeEach(module('rdx.cases.services'));

    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('assets/cases.json').
                  respond({cases:[{id: 1, name: 'bob'}]});
    }));


    it('can get all the static cases from server and cache them', inject(function(cases) {
      expect(cases.cases()).toEqual([]);
      cases.all();

      $httpBackend.flush();

      expect(cases.cases()).toEqual([{id: 1, name: 'bob'}]);
    }));

    it('can create a new interview and add it to the cache of cases', inject(function(cases) {
      cases.start_interview();
      expect(cases.current()).toEqual({ id: 2 });
    }));

  });
});
