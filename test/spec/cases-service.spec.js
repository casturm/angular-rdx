describe('rdx.cases.services', function() {

  describe('Cases', function(){
    var $httpBackend;

    beforeEach(module('rdx.cases.services'));

    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('assets/cases.json').
                  respond({cases:[{id: 1, name: 'bob'}]});
    }));


    it('can get all the static cases from server and cache them', inject(function(Cases) {
      expect(Cases.cases()).toEqual([]);
      Cases.all();

      $httpBackend.flush();

      expect(Cases.cases()).toEqual([{id: 1, name: 'bob'}]);
    }));

    it('can create a new interview and add it to the cache of cases', inject(function(Cases) {
      Cases.start_interview();
      expect(Cases.current()).toEqual({ id: 2 });
    }));

  });
});
