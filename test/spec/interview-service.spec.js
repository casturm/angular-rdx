describe('rdx.interview.Interview', function(){
  var $httpBackend, Interview;

  beforeEach(module('rdx.interview'));

  beforeEach(inject(function(_$httpBackend_, _Interview_) {
    Interview = _Interview_;
    $httpBackend = _$httpBackend_;
  }));

  it('should call api/interview and set the current interview', function() {
    var returnedInterview = {id: 1};

    $httpBackend.expectPOST('api/interview').respond(returnedInterview);

    Interview.create();

    $httpBackend.flush();
    expect(Interview.current()).toEqual(returnedInterview);
  });
});
