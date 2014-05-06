describe('rdx.auth.AuthService', function(){
  var $httpBackend, AuthService, authService, rootScope;

  beforeEach(module('http-auth-interceptor'));
  beforeEach(module('rdx.auth'));

  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _AuthService_, _authService_) {
    rootScope = _$rootScope_;
    AuthService = _AuthService_;
    $httpBackend = _$httpBackend_;
    authService = _authService_;
  }));

  describe('authenticate() with success response', function() {
    var user = {username: 'foo', password: 'bar'}
    var expectedResponse = {profile: {first_name: 'bob'}, token: 'token123'};
    var profileResponse;

    beforeEach(function() {
      $httpBackend.expectPOST('/authenticate').respond(expectedResponse);
      spyOn(authService, 'loginConfirmed');

      var authPromise = AuthService.authenticate(user);

      authPromise.then(function(resp) {
        profileResponse = resp.data;
      });

      $httpBackend.flush();
    });

    it('call loginConfirmed and set the user profile on the rootScope', function() {
      expect(profileResponse).toEqual(expectedResponse);
      expect(authService.loginConfirmed).toHaveBeenCalledWith(profileResponse);
      expect(rootScope.user).toEqual({name: profileResponse.profile.first_name});
    });
  });

  it('can call the authenticate api and return a error response', function() {
    var user = {username: 'fooy', password: 'bail'}
    var expectedResponse = 'auth failed';

    $httpBackend.expectPOST('/authenticate').respond(401, expectedResponse);

    var authPromise = AuthService.authenticate(user);

    var profileResponse;
    authPromise.then(function(success){},function(errorResp) {
      profileResponse = errorResp.data;
    });

    $httpBackend.flush();

    expect(profileResponse).toEqual(expectedResponse);
    expect(rootScope.user).toEqual(undefined);
  });
});
