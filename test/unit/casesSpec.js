describe('rdx.cases.services', function() {

  describe('cases', function(){
    var $httpBackend, factory;

    beforeEach(module('rdx.cases.services'));

    beforeEach(inject(function(_$httpBackend_, $factory) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('assets/cases.json').
                  respond([{id: 1, name: 'bob'}]);

      factory = $factory('cases', $httpBackend);
    }));


    it('all should populate cases with data', function() {
      expect(factory.cases).toEqual([]);
      factory.all();
      $httpBackend.flush();

      expect(factory.cases).toEqual([{id: 1, name: 'bob'}]);
    });
  });
});
